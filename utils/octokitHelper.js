const { Octokit } = require("octokit");

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN
});

module.exports = { octokit };