require('dotenv').config();
const { Octokit } = require('@octokit/rest');

let octokit;

try {
  octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN,
    userAgent: 'directory-maker-app',
    timeZone: 'UTC',
  });

  console.log('Octokit instance created successfully');
} catch (error) {
  console.error('Error creating Octokit instance:', error);
  throw error;
}

// Verify the token is set
if (!process.env.GITHUB_ACCESS_TOKEN) {
  console.warn('GITHUB_ACCESS_TOKEN is not set. GitHub operations may fail.');
}

module.exports = octokit;
