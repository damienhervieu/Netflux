var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

/* GET home page. */

router.get('/', function(req, res) {
  var message = '';
  res.render('index', {message: message});
});

router.get('/register', function(req, res){
  var message = '';
  res.render('register', {message: message});
});

router.post('/register', function (req, res){
  console.log("A user tried to connect");
});

router.get('/video', function(req, res) {
  const path = 'C:/Users/falle/Videos/Dr.Disrespect - Gillette (The Best A Man Can Get) By 199X [LINK IN DESC].mp4'
  const stat = fs.statSync(path)
  const fileSize = stat.size
  const range = req.headers.range
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1] 
      ? parseInt(parts[1], 10)
      : fileSize-1
    const chunksize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
})

module.exports = router;
