const mysql = require('mysql');

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
    const [password] = [req.body.password];
    connection.query('SELECT * FROM t_users WHERE ?', user, (error, results) => {
      console.log(results);
      if (error) {
        res.redirect('/login', { message });
      } else if (results.length > 0 && results[0].password === password) {
        message = 'Aw yeah! Welcome back!';
        /* [req.session.userId] = [results[0].id_user];
        [req.session.permission] = [results[0].permission];
        [req.session.user] = [results[0]]; */
        res.redirect('/');
      }
      message = 'Email not found';
      res.render('login', { message });
    });
  } else {
    res.render('login', { message });
  }
};

exports.register = (req, res) => {
  if (req.method === 'POST') {
    const today = new Date();
    const [password] = [req.body.password];
    const [passwordConfirm] = [req.body.passwordConfirm];


    const users = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      permission: 1,
      created_at: today,
      changed_at: today,
    };
    if (password !== passwordConfirm) {
      const message = 'Please enter the same password';
      res.render('register', { message });
    } else if (password !== passwordConfirm) {
      const message = 'Please enter the same email and password in the allocated fields';
      res.render('register', { message });
    } else {
      connection.query('INSERT INTO t_users SET ?', users, (error) => {
        if (error) {
          res.redirect('/register');
        } else {
          const message = 'Your account has been created!';
          res.redirect('/login', { message });
        }
      });
    }
  } else {
    res.render('register');
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.redirect('/');
    } else {
      res.redirect('/login');
    }
  });
};

exports.userManagement = (req, res) => {
  // if (req.session.permission === 2) {
    // const [permission] = req.session.permission;
    connection.query('SELECT * FROM t_users', (error, results) => {
      res.render('userManagement', { results });
    });
  /* } else {
    res.redirect('/');
  } */
};

exports.modifyUser = (req, res) => {
  const userId = req.params.id;
  //if (req.session.permission === 2) {
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
          console.log(error);
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
  /* } else {
    res.redirect('/');
  } */
};

exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  if (req.method === 'POST') {
    connection.query('DELETE FROM t_users WHERE `id` =  ?', userId, (error) => {
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
};