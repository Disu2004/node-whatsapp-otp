const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  state: {
    type: String,
    required: true
  }
});

const Register = mongoose.model('Register', registerSchema);

module.exports = Register;
