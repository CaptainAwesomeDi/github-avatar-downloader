var request = require("request");

console.log("Welcome to the GitHub Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb) {
  let options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'user-agent': 'request'
    }
  }
  request(options, function(err, res, body) {
    cb(err, body);
  });
}


getRepoContributors('jquery', 'jquery', (err, result) => {
  console.log("Errors:", err);
  console.log("Result:", result);
});