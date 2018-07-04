const session = require('express-session');
const mysql = require('mysql');

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

const listMediaCategory = function (category) {
  connection.query('SELECT * FROM t_media WHERE ?', category, (error, results) => {
    if (error) throw error;
    console.log(results);
  });
};

const listCategory = function () {
  connection.query('SELECT * FROM t_category', (error, results) => {
    if (error) throw error;
    console.log(results);
  });
};

exports.test = (req, res) => {
  listMediaCategory(4);
  listCategory();
  res.redirect('/');
};