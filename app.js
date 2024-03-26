const express = require('express');
const createError = require('http-errors');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config');
const path = require('path');
const logger = require('morgan');

/**
 * Routers
 */

const productsRouter = require('./routes/productsRouter');

// TODO: Connect to MongoDB

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.end('Hello');
});

app.use('/products', productsRouter);

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
