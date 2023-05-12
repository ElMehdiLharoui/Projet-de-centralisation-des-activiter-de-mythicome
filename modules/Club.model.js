const mongoose = require("mongoose");
//const bcrypt = require('bcryptjs');

const { Schema } = mongoose;
const userSchema = new Schema({
  name: { type: String, unique: true, required: true },
  listEvent: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
    ref: "events",
  }],
});

module.exports = mongoose.model("clubs", userSchema);
