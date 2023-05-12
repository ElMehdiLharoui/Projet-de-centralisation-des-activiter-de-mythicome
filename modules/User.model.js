const mongoose = require('mongoose');
//const bcrypt = require('bcryptjs');

const { Schema } = mongoose;
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 6,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxlength: 1024,
  },
  isAdmin: { type: Boolean, default: false },
  lastConnexion: Date,
});


module.exports = mongoose.model("users", userSchema);
