const express = require('express');
const router = express.Router();
const passport = require('passport');
const authenticate = require('../authenticate');

const User = require('../models/user');

router.get('/', (req, res, next) => {
  res.end('Users');
});

module.exports = router;
