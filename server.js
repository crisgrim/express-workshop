const express = require('express');
const formidable = require('express-formidable');
const fs = require('fs');
let app = express();
let post = {};
let file = '';

// Listen in a port 3000
app.listen(3000, function () {
  console.log('Server is listening on port 3000. Ready to accept requests!');
});

app.use(express.static("public"));
app.use(formidable());

app.post('/create-post', function (req, res) {
  fs.readFile(__dirname + '/data/posts.json', function (error, file) {
      file = JSON.parse(file);
      post = {
        date: Date.now(),
        text: req.fields.blogpost
      };
      file.push(post);
      file = JSON.stringify(file);
      fs.writeFile('data/posts.json', file, function (error) {
        // do something
      });
      res.send('Hello there!');
  });
});

app.get('/get-posts', function (req, res) {
  res.sendFile(__dirname + '/data/posts.json');
})