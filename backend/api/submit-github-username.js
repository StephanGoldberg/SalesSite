const { addUserToGitHubRepo } = require('../lib/addUserToGitHubRepo.js');
const { getPendingAccess, removePendingAccess } = require('../lib/db.js');

module.exports = async (req, res) => {
  const { token, githubUsername } = req.body;

  console.log('Received request to submit GitHub username');
  console.log('Token:', token);
  console.log('GitHub Username:', githubUsername);

  try {
    const pendingAccess = await getPendingAccess(token);
    console.log('Pending access:', pendingAccess);

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
};

