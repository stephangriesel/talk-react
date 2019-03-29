require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cors         = require('cors');

// Authentication
const session       = require('express-session');
const passport      = require('passport');

require('./configs/passport');

mongoose
  .connect('mongodb://localhost/fullstack-react-project', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup
app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      
// Handlebars
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// SESSION SETTINGS - maintain the sessions and our users in it
app.use(session({
  secret:"some secret goes here",
  resave: true,
  saveUninitialized: true
}));

// INIT passport.initialize() & passport.session(): (working)
app.use(passport.initialize());
app.use(passport.session());

// TITLE & DESCRIPTION BACKEND
app.locals.title = 'Express - Backend For The Forum';
app.locals.desc = 'Lady doing queries to the DB, 247';


// CORS
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000'] // Link to frontend, can always use more than one, its an array ;)
}));


// ROUTES MIDDLEWARE:
const index = require('./routes/index');

// AUTH ROUTES 
const authRoutes = require('./routes/auth-routes');
app.use('/api', authRoutes);

app.use('/', index);
// app.use('/users', require('./routes/users'));
app.use('/api', require('./routes/topic-routes'));
app.use('/api', require('./routes/comment-routes'));

// PUBLIC
app.use(express.static(path.join(__dirname,'public/')));
app.use(express.static(path.join(__dirname,'public/build')));

module.exports = app;
