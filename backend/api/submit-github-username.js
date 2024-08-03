require('dotenv').config();
const { addUserToGitHubRepo } = require('../lib/octokit');
const { getPendingAccess, removePendingAccess } = require('../lib/db');

module.exports = async (req, res) => {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'https://www.directory-maker.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { token, githubUsername } = req.body;

    const pendingAccess = getPendingAccess(token);
    if (!pendingAccess || !pendingAccess.paid) {
      return res.status(403).json({ error: 'Invalid or unpaid access token' });
    }

    try {
      await addUserToGitHubRepo(githubUsername);
      removePendingAccess(token);
      res.json({ success: true, message: 'Access granted to GitHub repository' });
    } catch (error) {
      console.error('Error granting GitHub access:', error);
      res.status(500).json({ error: 'Failed to grant GitHub access' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
