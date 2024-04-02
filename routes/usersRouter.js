const express = require('express');
const router = express.Router();
const passport = require('passport');
const authenticate = require('../utils/authenticate');
const cors = require('../utils/cors');

const User = require('../models/user');

router.get(
  '/',
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res, next) => {
    User.find()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => next(err));
  }
);

router.post('/signup', (req, res) => {
  console.log(req.body);
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        console.log('Error registering user.');
        res.status(500).json({ err: err });
      } else {
        if (req.body.firstname) {
          user.firstname = req.body.firstname;
        }
        if (req.body.lastname) {
          user.lastname = req.body.lastname;
        }
        user.save((err) => {
          if (err) {
            console.log('Error saving updated profile');
            res.status(500).json({ err: err });
            return;
          }
          passport.authenticate('local')(req, res, () => {
            res
              .status(200)
              .json({ success: true, status: 'Registration Successful!' });
          });
        });
      }
    }
  );
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  const token = authenticate.getToken({ _id: req.user._id });
  res.status(200).json({
    success: true,
    token: token,
    status: 'You are successfully logged in!'
  });
});

module.exports = router;
