const { getPendingAccess, deletePendingAccess } = require('../lib/db');
const addUserToGitHubRepo = require('../lib/addUserToGitHubRepo');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { token, githubUsername } = req.body;

    const pendingAccess = await getPendingAccess();
    if (!pendingAccess[token] || !pendingAccess[token].paid) {
      return res.status(403).json({ error: 'Invalid or unpaid access token' });
    }

    try {
      await addUserToGitHubRepo(githubUsername);
      await deletePendingAccess(token);
      res.status(200).json({ success: true, message: 'Access granted to GitHub repository' });
    } catch (error) {
      console.error('Error granting GitHub access:', error);
      res.status(500).json({ error: 'Failed to grant GitHub access' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};