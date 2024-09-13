const cors = require('cors');
const { getPendingAccess, removePendingAccess, cleanupPendingAccess, loadFromFile } = require('../lib/db.js');
const { addUserToGitHubRepo } = require('../lib/addUserToGitHubRepo.js');

const corsMiddleware = cors({
  origin: process.env.FRONTEND_URL,
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});

module.exports = async (req, res) => {
  console.log('submit-github-username.js: Request received:', req.method, req.url);
  
  await new Promise((resolve) => corsMiddleware(req, res, resolve));

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Reload database from file for each request
  await loadFromFile();

  if (req.method === 'GET') {
    const token = req.query.token;
    console.log('Checking payment status for token:', token);
    
    const pendingAccess = getPendingAccess(token);
    console.log('Pending access for token:', JSON.stringify(pendingAccess));
    
    if (pendingAccess) {
      return res.status(200).json({ paid: pendingAccess.paid });
    } else {
      console.log('Token not found in pending access');
      return res.status(404).json({ error: 'Token not found', message: 'Your session may have expired or the payment is still processing. Please try again or contact support.' });
    }
  }

  if (req.method === 'POST') {
    const { token, githubUsername } = req.body;

    console.log('Received request to submit GitHub username');
    console.log('Token:', token);
    console.log('GitHub Username:', githubUsername);

    try {
      // Run cleanup process
      await cleanupPendingAccess();
      console.log('Cleanup process completed');

      const pendingAccess = getPendingAccess(token);
      console.log('Pending access:', JSON.stringify(pendingAccess));

      if (!pendingAccess || !pendingAccess.paid) {
        console.log('Invalid or unpaid access token:', token);
        return res.status(403).json({ error: 'Invalid or unpaid access token' });
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
          message: 'An invitation has been sent to your GitHub account. Please check your email and accept the invitation to gain access to the repository.' 
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
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
};
