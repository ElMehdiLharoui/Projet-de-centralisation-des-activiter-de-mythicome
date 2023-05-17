const mongoose = require("mongoose");

const FormationModel = new mongoose.Schema({
  //key:{ type: mongoose.Schema.Types.ObjectId },
  name: { type: String, unique: true, required: true },
  listParticipent: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
    ref: "users",
  }],
  Formateur: { type: String, unique: false, required: false },
  startTime: Date,
  endTime: Date,
});

module.exports = mongoose.model("Formation", FormationModel);
