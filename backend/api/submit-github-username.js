const cors = require('cors');
const { getPendingAccess, removePendingAccess } = require('../lib/db.js');
const { addUserToGitHubRepo } = require('../lib/addUserToGitHubRepo.js');

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

const corsMiddleware = cors(corsOptions);

module.exports = async (req, res) => {
  await new Promise((resolve) => corsMiddleware(req, res, resolve));

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
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
      await addUserToGitHubRepo(githubUsername);
      await removePendingAccess(token);
      
      console.log('Access granted to GitHub repository for:', githubUsername);
      res.status(200).json({ success: true, message: 'Access granted to GitHub repository' });
    } catch (error) {
      console.error('Error granting GitHub access:', error);
      res.status(500).json({ error: 'Failed to grant GitHub access', details: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

