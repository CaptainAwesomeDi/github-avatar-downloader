var request = require("request");

console.log("Welcome to the GitHub Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb) {
  let options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'user-agent': 'request'
    }
  }
  request(options, (err, res, body) => {
    cb(err, JSON.parse(body));
  });
}


getRepoContributors('jquery', 'jquery', (err, result) => {

  console.log("Errors:", err);
  for(var i = 0; i < result.length; i++){
    console.log(result[i].avatar_url);
  }
});