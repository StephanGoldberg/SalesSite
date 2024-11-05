const Stripe = require('stripe');
const { addUserToGitHubRepo } = require('../lib/addUserToGitHubRepo.js');
const { getPendingAccess, removePendingAccess, cleanupPendingAccess } = require('../lib/db.js');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const verifyPaymentStatus = async (token, sessionId, state) => {
  try {
    const pendingAccess = await getPendingAccess(token);
    
    // First verify the state parameter if available
    if (sessionId && state && pendingAccess?.state !== state) {
      console.log('State parameter verification failed');
      return false;
    }

    // Then verify with Stripe if we have a session ID
    if (sessionId) {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.payment_status === 'paid') {
        return true;
      }
    }

    // Fall back to the old verification method if needed
    const sessions = await stripe.checkout.sessions.list({
      limit: 100,
      created: {
        gte: Math.floor(Date.now() / 1000) - (30 * 60)
      }
    });
    
    const matchingSession = sessions.data.find(session => 
      session.success_url.includes(token) && 
      session.payment_status === 'paid'
    );

    return !!matchingSession;
  } catch (error) {
    console.error('Error verifying payment:', error);
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
      const isPaid = await verifyPaymentStatus(token, session_id, state);
      
      if (isPaid) {
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

    console.log('Received request to submit GitHub username');
    console.log('Token:', token);
    console.log('Session ID:', session_id);
    console.log('GitHub Username:', githubUsername);

    try {
      await cleanupPendingAccess();
      console.log('Cleanup process completed');

      const isPaid = await verifyPaymentStatus(token, session_id, state);

      if (!isPaid) {
        console.log('Payment not confirmed');
        return res.status(403).json({ error: 'Payment not confirmed' });
      }

      console.log('Adding user to GitHub repo:', githubUsername);
      const result = await addUserToGitHubRepo(githubUsername);
      
      if (result === 'owner') {
        console.log('User is the repository owner');
        await removePendingAccess(token);
        return res.status(200).json({ 
          success: true, 
          isOwner: true,
          message: 'You are the repository owner. Access is already granted.' 
        });
      } else if (result === true) {
        console.log('Access granted to GitHub repository');
        await removePendingAccess(token);
        return res.status(200).json({ 
          success: true, 
          isOwner: false,
          message: 'You have been granted access to the repository.' 
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