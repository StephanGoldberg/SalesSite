const cors = require('cors');
const { getPendingAccess, removePendingAccess, getAllPendingAccess } = require('../lib/db.js');
const { addUserToGitHubRepo } = require('../lib/addUserToGitHubRepo.js');

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

const corsMiddleware = cors(corsOptions);

module.exports = async (req, res) => {
  console.log('Request received:', req.method, req.url);
  
  await new Promise((resolve) => corsMiddleware(req, res, resolve));

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const token = req.query.token;
    console.log('Checking payment status for token:', token);
    
    try {
      const allPendingAccess = getAllPendingAccess();
      console.log('All pending access:', allPendingAccess);

      const pendingAccess = getPendingAccess(token);
      console.log('Pending access for token:', pendingAccess);
      
      if (pendingAccess) {
        return res.json({ paid: pendingAccess.paid });
      } else {
        return res.status(404).json({ error: 'Token not found' });
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (req.method === 'POST') {
    console.log('Received request to submit GitHub username');
    console.log('Request body:', req.body);
    const { token, githubUsername } = req.body;

    try {
      const pendingAccess = getPendingAccess(token);
      console.log('Pending access:', pendingAccess);
      if (!pendingAccess || !pendingAccess.paid) {
        console.log('Invalid or unpaid access token:', token);
        return res.status(403).json({ error: 'Invalid or unpaid access token' });
      }

      console.log('Adding user to GitHub repo:', githubUsername);
      const result = await addUserToGitHubRepo(githubUsername);
      
      if (result === 'owner') {
        console.log('User is the repository owner:', githubUsername);
        await removePendingAccess(token);
        return res.status(200).json({ isOwner: true, message: 'You are the repository owner. Access is already granted.' });
      }
      
      await removePendingAccess(token);
      console.log('Access granted to GitHub repository for:', githubUsername);
      res.status(200).json({ success: true, message: 'Access granted to GitHub repository' });
    } catch (error) {
      console.error('Error granting GitHub access:', error);
      res.status(500).json({ error: 'Failed to grant GitHub access', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
