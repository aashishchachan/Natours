const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name must be there'],
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  image: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please provide a password'],
    validate: {
        validator: function (el) {
            return el === this.password;
        },
        message: "Passwords doesn't match"
    }
  },
});

userSchema.pre('save', async function (next) {
    //check if the function been called for password modification and not something else
    if (!this.isModified('password')) return next();

    //hashing with the power of 12
    this.password = await bcrypt.hash(this.password, 12);

    //undefining password confirm as we no longer require that
    this.passwordConfirm = undefined;
    next();
})



const User = new mongoose.model('User', userSchema);

module.exports = User;
