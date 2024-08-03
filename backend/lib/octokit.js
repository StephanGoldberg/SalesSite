require('dotenv').config();
const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN
});

module.exports = octokit;