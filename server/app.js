const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const user = require('./routes/user');
const index = require('./routes/index');
const main = require('./routes/main');

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(cors(process.env.ORIGIN, { withCredentials: true }));

app.get('/', index.home);

app.get('/test', main.test);

app.get('/login', user.login);

app.post('/login', user.login);

app.get('/logout', user.logout);

app.get('/upload', user.upload);

app.post('/upload', user.upload);

app.get('/register', user.register);

app.post('/register', user.register);

app.get('/user-management', user.userManagement);

app.get('/user-management/modify/:id', user.modifyUser);

app.post('/user-management/modify/:id', user.modifyUser);

app.get('/user-management/delete/:id', user.deleteUser);

app.post('/user-management/delete/:id', user.deleteUser);

app.get('/video', index.video);

app.listen(3000);