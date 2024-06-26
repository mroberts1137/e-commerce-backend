const express = require('express');
const createError = require('http-errors');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config');
const path = require('path');
const logger = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

/**
 * Routers
 */

const indexRouter = require('./routes/indexRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');

/**
 * Connect to MongoDB
 */

// const url = process.env.CONNECTIONSTRING;
const url = config.mongoUrl;

const connect = mongoose.connect(url, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

connect
  .then(() => console.log('Connected to MongoDB server'))
  .catch((err) => console.log(err));

const app = express();

// redirect HTTP requests to HTTPS
// app.all('*', (req, res, next) => {
//   if (req.secure) {
//     return next();
//   } else {
//     console.log(
//       `Redirecting to: https://${req.hostname}:${app.get('secPort')}${req.url}`
//     );
//     res.redirect(
//       301,
//       `https://${req.hostname}:${app.get('secPort')}${req.url}`
//     );
//   }
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

/**
 * Routes
 */

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
