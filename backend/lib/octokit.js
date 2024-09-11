require('dotenv').config();
const { Octokit } = require('@octokit/rest');

let octokit;

try {
  if (!process.env.GITHUB_ACCESS_TOKEN) {
    throw new Error('GITHUB_ACCESS_TOKEN is not set');
  }

  octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN,
    userAgent: 'directory-maker-app',
    timeZone: 'UTC',
  });

  console.log('Octokit instance created successfully');
} catch (error) {
  console.error('Error creating Octokit instance:', error.message);
  if (error.message === 'GITHUB_ACCESS_TOKEN is not set') {
    console.warn('GitHub operations may fail due to missing access token.');
  }
  throw error;
}

// Additional verification (optional)
octokit.rest.users.getAuthenticated()
  .then(({ data }) => {
    console.log('GitHub authentication successful. Logged in as:', data.login);
  })
  .catch(error => {
    console.error('GitHub authentication failed:', error.message);
  });

module.exports = octokit;
