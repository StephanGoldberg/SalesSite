const Stripe = require('stripe');
const { addUserToGitHubRepo } = require('../lib/addUserToGitHubRepo.js');
const { getPendingAccess, removePendingAccess, cleanupPendingAccess, setPendingAccess } = require('../lib/db.js');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const verifyPaymentWithStripe = async (token, sessionId, state) => {
  try {
    // First verify the stored token and state
    const pendingAccess = await getPendingAccess(token);
    
    // Verify state parameter if provided (anti-CSRF)
    if (sessionId && state && pendingAccess?.state !== state) {
      console.error('State parameter verification failed');
      return false;
    }

    if (sessionId) {
      // Verify the specific session
      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (session.payment_status === 'paid') {
          await setPendingAccess(token, { 
            paid: true, 
            sessionId: session.id,
            state: pendingAccess?.state // Preserve state for security
          });
          return true;
        }
      } catch (error) {
        console.error('Error retrieving session:', error);
      }
    }

    // Fallback to recent sessions with time limit
    const sessions = await stripe.checkout.sessions.list({
      limit: 100,
      created: {
        gte: Math.floor(Date.now() / 1000) - (30 * 60) // Last 30 minutes only
      }
    });
    
    const matchingSession = sessions.data.find(session => 
      session.success_url.includes(token) && 
      session.payment_status === 'paid'
    );

    if (matchingSession) {
      await setPendingAccess(token, { 
        paid: true, 
        sessionId: matchingSession.id,
        state: pendingAccess?.state // Preserve state for security
      });
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error verifying payment with Stripe:', error);
    return false;
  }
};

module.exports = async (req, res) => {
  console.log('Request method:', req.method);
  console.log('Request URL:', req.url);
  console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);

  if (req.method === 'GET') {
    const { token, session_id, state } = req.query;
    console.log('Checking payment status for token:', token);
    
    try {
      let pendingAccess = await getPendingAccess(token);
      console.log('Pending access for token:', JSON.stringify(pendingAccess));
      
      // Check token expiration
      if (pendingAccess?.expiresAt && Date.now() > pendingAccess.expiresAt) {
        await removePendingAccess(token);
        return res.status(400).json({ 
          error: 'Token expired',
          message: 'Access token has expired. Please try again.' 
        });
      }

      if (!pendingAccess || !pendingAccess.paid) {
        console.log('Token not found or payment not confirmed in local data. Verifying with Stripe...');
        const isPaid = await verifyPaymentWithStripe(token, session_id, state);
        if (isPaid) {
          pendingAccess = { paid: true };
        }
      }
      
      if (pendingAccess && pendingAccess.paid) {
        return res.status(200).json({ paid: true });
      } else {
        console.log('Payment not confirmed for token:', token);
        return res.status(404).json({ 
          error: 'Payment not confirmed', 
          message: 'Your payment has not been confirmed. Please try again or contact support.' 
        });
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
      return res.status(500).json({ 
        error: 'Internal server error', 
        message: 'An unexpected error occurred. Please try again later.' 
      });
    }
  } else if (req.method === 'POST') {
    const { token, session_id, state, githubUsername } = req.body;

    if (!token || !githubUsername) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    console.log('Received request to submit GitHub username');
    console.log('Token:', token);
    console.log('GitHub Username:', githubUsername);

    try {
      await cleanupPendingAccess();
      console.log('Cleanup process completed');

      let pendingAccess = await getPendingAccess(token);
      console.log('Pending access:', JSON.stringify(pendingAccess));

      // Check token expiration
      if (pendingAccess?.expiresAt && Date.now() > pendingAccess.expiresAt) {
        await removePendingAccess(token);
        return res.status(400).json({ 
          error: 'Token expired',
          message: 'Access token has expired. Please try again.' 
        });
      }

      if (!pendingAccess || !pendingAccess.paid) {
        console.log('Payment not confirmed in local data. Verifying with Stripe...');
        const isPaid = await verifyPaymentWithStripe(token, session_id, state);
        if (isPaid) {
          pendingAccess = { paid: true };
        }
      }

      if (!pendingAccess || !pendingAccess.paid) {
        console.log('Invalid or unpaid access token:', token);
        return res.status(403).json({ error: 'Invalid or unpaid access token' });
      }

      // Basic GitHub username validation
      if (!/^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/.test(githubUsername)) {
        return res.status(400).json({ error: 'Invalid GitHub username format' });
      }

      console.log('Adding user to GitHub repo:', githubUsername);
      const result = await addUserToGitHubRepo(githubUsername);
      
      if (result === 'owner') {
        console.log('User is the repository owner. No need to add as collaborator.');
        await removePendingAccess(token);
        return res.status(200).json({ 
          success: true, 
          isOwner: true,
          message: 'You are the repository owner. Access is already granted.' 
        });
      } else if (result === true) {
        console.log('Access granted to GitHub repository for:', githubUsername);
        await removePendingAccess(token);
        return res.status(200).json({ 
          success: true, 
          isOwner: false,
          message: 'You have been granted access to the repository. If you haven\'t received an email, you may already have access. Please check your GitHub account.' 
        });
      } else {
        throw new Error('Failed to add user to GitHub repository');
      }
    } catch (error) {
      console.error('Error granting GitHub access:', error);
      if (error.message.includes('Repository owner cannot be a collaborator')) {
        res.status(400).json({ 
          error: 'Invalid GitHub username', 
          details: 'The repository owner cannot be added as a collaborator.' 
        });
      } else {
        res.status(500).json({ 
          error: 'Failed to grant GitHub access', 
          details: error.message 
        });
      }
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};