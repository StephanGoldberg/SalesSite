const { Octokit } = require('@octokit/rest');
const dotenv = require('dotenv');

dotenv.config();

const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });

async function addUserToGitHubRepo(username) {
  console.log(`Attempting to add user ${username} to repository...`);
  
  try {
    const owner = process.env.GITHUB_REPO_OWNER;
    const repo = process.env.GITHUB_REPO_NAME;

    console.log(`Repository details - Owner: ${owner}, Repo: ${repo}`);

    // Check if the username is the same as the repo owner
    if (username.toLowerCase() === owner.toLowerCase()) {
      console.log(`User ${username} is the repository owner. No need to add as collaborator.`);
      return 'owner';
    }

    const response = await octokit.repos.addCollaborator({
      owner,
      repo,
      username,
      permission: 'pull'
    });

    if (response.status === 201) {
      console.log(`Successfully added ${username} to the repository ${owner}/${repo}`);
      return true;
    } else if (response.status === 204) {
      console.log(`User ${username} is already a collaborator on ${owner}/${repo}`);
      return true;
    } else {
      console.log(`Unexpected response status: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error('Error adding user to GitHub repo:', error.message);
    if (error.response) {
      console.error('Error details:', error.response.data);
    }
    throw error;
  }
}

module.exports = { addUserToGitHubRepo };
