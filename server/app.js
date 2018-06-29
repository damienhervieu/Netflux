const express = require('express');
// const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const mysql = require('mysql');
const user = require('./routes/user');
const index = require('./routes/index');

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'd_netflux',
});

connection.connect();

global.db = connection;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
/* app.use(session({
  secret: 'netflux_user',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 },
})); */

app.get('/', index.home);

app.get('/login', user.login);

app.post('/login', user.login);

app.get('/logout', user.logout);

app.get('/register', user.register);

app.post('/register', user.register);

app.get('/user-management', user.userManagement);

app.get('/user-management/modify/:id', user.modifyUser);

app.post('/user-management/modify/:id', user.modifyUser);

app.get('/user-management/delete/:id', user.deleteUser);

app.post('/user-management/delete/:id', user.deleteUser);

app.get('/video', index.video);

app.listen(3000);