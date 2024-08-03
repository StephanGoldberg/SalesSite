require('dotenv').config();

const octokit = require('./octokit');

async function addUserToGitHubRepo(username) {
  try {
    await octokit.repos.addCollaborator({
      owner: process.env.GITHUB_REPO_OWNER,
      repo: process.env.GITHUB_REPO_NAME,
      username: username,
      permission: 'pull'
    });
    console.log(`Successfully added ${username} to the repository`);
  } catch (error) {
    console.error('Error adding user to GitHub repo:', error);
    throw error;
  }
}

module.exports = addUserToGitHubRepo;