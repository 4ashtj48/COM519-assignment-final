require("dotenv").config();
const express = require('express');
var methodOverride = require('method-override')
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');




const app = express();
const server = require('http').createServer(app);


//changing post to PUT
app.use(methodOverride('_method'))

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI||process.env.MONGODB_URI

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
//based on models.
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/createPO', require('./routes/pos.js'))
app.use('/jobs', require('./routes/jobRefs.js'))


const WEB_PORT = process.env.WEB_PORT
server.listen(WEB_PORT, () => { });

