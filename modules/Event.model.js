const mongoose = require("mongoose");

const EventModel = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  description: {
    type: String,
    unique: false,
    required: true,
    minLength: 6,
    maxlength: 1024,
  },
  clubName: { type: mongoose.Schema.Types.ObjectId, ref: "clubs" },
  ville: { type: String, unique: false, required: true },
  paticipentMax: { type: Number, required: false, default: undefined },
  startTime: Date,
  endTime: Date,
  listParticipent: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
    ref: "users",
  }],
  dateFinal: Date,
  Image: { data: Buffer, contentType: String },
});
module.exports = mongoose.model("events", EventModel);
