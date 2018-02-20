var request = require("request");
var fs = require("fs");
var owner = process.argv[2];
var repo = process.argv[3];

console.log("Welcome to the GitHub Avatar Downloader!");
//main function to get repo contributors
//and parse them into array of Objects
//params: repoOwner <String> repoName <String> cb <Callback>
function getRepoContributors(repoOwner, repoName, cb) {
  if (!(repoOwner && repoName)) {
    console.log("missing 1 or both arguments: please enter <Owner> <Repo>!")
  } else {
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
}

//Invoke main function with Callback function for main function
//passes list of URL to downloadImageByURL
getRepoContributors(owner, repo, (err, result) => {
  console.log("Errors:", err);
  for (var i = 0; i < result.length; i++) {
    console.log(result[i].avatar_url);
    downloadImageByURL(result[i].avatar_url, './avatars/' + result[i].login + '.jpg');
  }
});

//download an images and save it to a filepath
//params: url <String> filepath <String>
function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', (err) => console.log('error: ', err))
    .on('response', (response) => {
      console.log(response.statusMessage);
      console.log(response.headers['content-type']);
    })
    .on('end', () => console.log('Downloading Image'))
    .pipe(fs.createWriteStream(filePath))
    .on('finish', () => console.log('Finished Downloading'));
}