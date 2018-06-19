var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

/* GET home page. */
router.get('/', function(req, res) {
	res.sendFile(path.join('D:/Cours/B3/Netflux/views/index.html'));
})

router.get('/video', function(req, res) {
  const path = 'C:/Users/falle/Videos/American_Dad_S02/American Dad.S02E01.FRENCH.720p.WEB-DL.x264-FTMVHD.mkv'
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
      'Content-Type': 'video/mkv',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mkv',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
})

module.exports = router;
