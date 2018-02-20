var request = require("request");
var fs = require("fs");

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
  for (var i = 0; i < result.length; i++) {
    console.log(result[i].avatar_url);
  }
});

function downloadImageByURL(url, filePath) {
  request.get(url)
  .on('error',(err)=> console.log('error: ', err))
  .on('response',(response) => {
    console.log(response.statusMessage);
    console.log(response.headers['content-type']);})
  .on('end',()=>console.log('Downloading Image'))
  .pipe(fs.createWriteStream(filePath))
  .on('finish',()=>console.log('Finished Downloading'));
}

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");