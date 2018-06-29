const fs = require('fs');

exports.home = (req, res) => {
  res.render('home');
};

exports.video = (req, res) => {
  const source = 'C:/Users/falle/Videos/Dr.Disrespect - Gillette (The Best A Man Can Get) By 199X [LINK IN DESC].mp4';
  const stat = fs.statSync(source);
  const fileSize = stat.size;
  const [range] = [req.headers.range];
  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize - 1;
    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(source, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(source).pipe(res);
  }
};
