const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  username: String,
  email:    String,
  password: String,
  nb_of_employees: Number
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
