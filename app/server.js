const http = require('http');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const express = require('express');
const expressSession = require('express-session');
const authentication = require('./middlewares/authentication');
const session = require('./middlewares/session');
const connection = require('./middlewares/connection');
const userRouter = require('./user/user.router');
const courseRouter = require('./course/course.router');

const app = express();

// Static files
app.use('/public', express.static('app/public'));

// General configuration
app.use(expressSession({ secret: 'kl@pauc1s' }));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(connection());
app.use(authentication());
app.use(session());

// Views
app.set('view engine', 'ejs');
app.set('views', 'app/views');

// Routes
app.use('/courses', courseRouter(express.Router()));
app.use('/users', userRouter(express.Router()));

const server = http.createServer(app);

module.exports = server;
