require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const passport           = require('passport');
const LocalStrategy      = require('passport-local').Strategy;
const User               = require('./models/user');
const bcrypt             = require('bcrypt');
const session            = require('express-session');
const MongoStore         = require('connect-mongo')(session);
const flash              = require('connect-flash');

mongoose
  .connect('mongodb://localhost/lnconsulting', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

app.use(session({
  secret: 'lnconsulting',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore( { mongooseConnection: mongoose.connection })
}))

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

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
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});
passport.deserializeUser((id, cb) => {
  User.findById(id)
    .then(user => cb(null, user))
    .catch(err => cb(err))
  ;
});

passport.use(new LocalStrategy(
  {passReqToCallback: true},
  (...args) => {
    const [req,,, done] = args;

    const {username, password} = req.body;

    User.findOne({username})
      .then(user => {
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
          
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: "Incorrect password" });
        }
    
        done(null, user);
      })
      .catch(err => done(err))
    ;
  }
));

// default value for title local
app.locals.title = 'LN-Consulting';



const index = require('./routes/index');
app.use('/', index);

const services = require('./routes/services');
app.use('/', services);

const authRoutes = require('./routes/authentication');
app.use('/', authRoutes);

const estimateRoute = require('./routes/estimate');
app.use('/', estimateRoute);

const aboutusRoute = require('./routes/aboutus');
app.use('/', aboutusRoute);

const ourlocationRoute = require('./routes/ourlocation');
app.use('/', ourlocationRoute);

const contactusRoute = require('./routes/contactus');
app.use('/', contactusRoute);

module.exports = app;
