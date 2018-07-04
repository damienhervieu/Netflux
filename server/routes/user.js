const mysql = require('mysql');
const bcrypt = require('bcrypt');
const session = require('express-session');
const formidable = require('formidable');
const path = require('path');

const uploadDir = path.join(__dirname, '/..', '/ressources/');

session({
  secret: 'netflux user',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 },
});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'd_netflux',
});

exports.login = (req, res) => {
  let message = '';
  if (req.method === 'POST') {
    const user = {
      email: req.body.email,
    };
    connection.query('SELECT * FROM t_users WHERE ?', user, (error, results) => {
      if (error) {
        throw error;
      } else if (results.length > 0) {
        bcrypt.compare(req.body.password, results[0].password, (_err, confirm) => {
          if (confirm) {
            session.connected = true;
            session.user_id = results[0].id_user;
            session.permission = results[0].permission;
            res.redirect('/');
          } else {
            message = 'Invalid credentials were provided';
            res.render('login', { message });
          }
        });
      } else {
        message = 'Email not found';
        res.render('login', { message });
      }
    });
  } else {
    res.render('login', { message });
  }
};

exports.register = (req, res) => {
  if (req.method === 'POST') {
    const today = new Date();
    const { password } = req.body.password;
    const { passwordConfirm } = req.body.passwordConfirm;

    if (password !== passwordConfirm) {
      const message = 'Please enter the same password';
      res.render('register', { message });
    } else if (password !== passwordConfirm) {
      const message = 'Please enter the same email and password in the allocated fields';
      res.render('register', { message });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          res.render('register');
          throw err;
        } else {
          const users = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hash,
            permission: 1,
            created_at: today,
            changed_at: today,
          };
          connection.query('INSERT INTO t_users SET ?', users, (error) => {
            if (error) {
              throw error;
            } else {
              res.redirect('/login');
            }
          });
        }
      });
    }
  } else {
    const message = '';
    res.render('register', { message });
  }
};

exports.logout = (_req, res) => {
  session.destroy((err) => {
    if (err) {
      res.redirect('/');
    } else {
      res.redirect('/login');
    }
  });
};

exports.upload = (req, res) => {
  if (session.permission === 2) {
    if (req.method === 'POST') {
      const form = new formidable.IncomingForm();
      form.multiples = true;
      form.keepExtensions = true;
      form.uploadDir = uploadDir;
      form.maxFieldsSize *= 1024; // 20 GB max
      form.parse(req, (err, fields, files) => {
        if (err) return res.status(500).json({ error: err });
        // res.status(200).json({ uploaded: true });
        const media = {
          title: fields.title,
          category: fields.category,
          thumbnail: files.thumbnail.path,
          video: files.video.path,
          author: fields.author,
        };
        connection.query('INSERT INTO t_media SET ?', media, (error) => {
          if (error) {
            throw error;
          }
        });
      });
      form.on('fileBegin', (_name, file) => {
        const [fileName, fileExt] = file.name.split('.');
        if (fileExt === 'mp4') file.path = path.join(uploadDir, '/video/', `${fileName}_${new Date().getTime()}.${fileExt}`);
        else file.path = path.join(uploadDir, '/thumbnail/', `${fileName}_${new Date().getTime()}.${fileExt}`);
      });
      form.on('end', () => {
        res.redirect('/');
      });
    } else {
      connection.query('SELECT * FROM t_category', (_error, results) => {
        res.render('upload', { results });
      });
    }
  } else {
    res.redirect('/');
  }
};

exports.userManagement = (_req, res) => {
  if (session.permission === 2) {
    connection.query('SELECT * FROM t_users', (_error, results) => {
      res.render('userManagement', { results });
    });
  } else {
    res.redirect('/');
  }
};

exports.modifyUser = (req, res) => {
  const userId = req.params.id;
  if (session.permission === 2) {
    if (req.method === 'POST') {
      const [permission] = [req.body.permission];
      const modifiedUser = [
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        [permission],
        userId,
      ];
      connection.query('UPDATE t_users SET `first_name` = ?, `last_name` = ?, `email` = ?, `permission` = ? WHERE `id_user` = ?', modifiedUser, (error) => {
        if (error) {
          throw error;
        } else {
          res.redirect('/user-management');
        }
      });
    } else {
      connection.query('SELECT * FROM t_users WHERE id_user = ?', userId, (error, results) => {
        if (error) {
          const message = ('An error occured during the selection : ', error);
          res.render('user-management', { message });
        } else {
          const message = '';
          res.render('modify', { results, message });
        }
      });
    }
  } else {
    res.redirect('/');
  }
};

exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  if (session.permission === 2) {
    if (req.method === 'POST') {
      connection.query('DELETE FROM t_users WHERE id_user =  ?', userId, (error) => {
        if (error) {
          const message = ('An error occured during the deletion : ', error);
          res.render('delete', { message });
        } else {
          res.redirect('/user-management');
        }
      });
    } else {
      connection.query('SELECT * FROM t_users WHERE id_user = ?', userId, (error, results) => {
        if (error) {
          const message = ('An error occured during the selection : ', error);
          res.render('user-management', { message });
        } else {
          res.render('delete', { results });
        }
      });
    }
  } else {
    res.redirect('/');
  }
};