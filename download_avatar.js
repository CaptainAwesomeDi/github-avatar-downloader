var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  // ...
}

getRepoContributors('jquery', 'jquery', (err, result) => {
  console.log('error', err);
  console.log('result', result);

});