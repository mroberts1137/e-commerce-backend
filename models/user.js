const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    default: ''
  },
  lasname: {
    type: String,
    default: ''
  },
  admin: {
    type: Boolean,
    default: false
  }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
