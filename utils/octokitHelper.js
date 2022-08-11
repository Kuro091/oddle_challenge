const { Octokit } = require("octokit");
console.log(' token is', process.env.NEXT_PUBLIC_GITHUB_TOKEN);

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN
});

module.exports = { octokit };