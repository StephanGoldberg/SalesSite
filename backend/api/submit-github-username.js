const Stripe = require('stripe');
const { addUserToGitHubRepo } = require('../lib/addUserToGitHubRepo.js');
const { getPendingAccess, removePendingAccess, cleanupPendingAccess, setPendingAccess } = require('../lib/db.js');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const verifyPaymentWithStripe = async (token, sessionId) => {
  try {
    // If we have a session ID, check it directly first
    if (sessionId) {
      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (session.payment_status === 'paid') {
          await setPendingAccess(token, { paid: true, sessionId: session.id });
          return true;
        }
      } catch (error) {
        console.error('Error retrieving session:', error);
      }
    }

    // Fall back to listing sessions if direct check fails
    const sessions = await stripe.checkout.sessions.list({
      limit: 100,
    });
    
    const matchingSession = sessions.data.find(session => 
      session.success_url.includes(token) && session.payment_status === 'paid'
    );

    if (matchingSession) {
      await setPendingAccess(token, { paid: true, sessionId: matchingSession.id });
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
    const token = req.query.token;
    const sessionId = req.query.session_id;
    console.log('Checking payment status for token:', token);
    
    try {
      let pendingAccess = await getPendingAccess(token);
      console.log('Pending access for token:', JSON.stringify(pendingAccess));
      
      if (!pendingAccess || !pendingAccess.paid) {
        console.log('Token not found or payment not confirmed in local data. Verifying with Stripe...');
        const isPaid = await verifyPaymentWithStripe(token, sessionId);
        if (isPaid) {
          pendingAccess = { paid: true };
        }
      }
      
      if (pendingAccess && pendingAccess.paid) {
        return res.status(200).json({ paid: true });
      } else {
        console.log('Payment not confirmed for token:', token);
        return res.status(404).json({ error: 'Payment not confirmed', message: 'Your payment has not been confirmed. Please try again or contact support.' });
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
      return res.status(500).json({ error: 'Internal server error', message: 'An unexpected error occurred. Please try again later.' });
    }
  } else if (req.method === 'POST') {
    const { token, githubUsername } = req.body;

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

      if (!pendingAccess || !pendingAccess.paid) {
        console.log('Payment not confirmed in local data. Verifying with Stripe...');
        const isPaid = await verifyPaymentWithStripe(token);
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