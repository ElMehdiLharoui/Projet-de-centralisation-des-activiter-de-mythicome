const mongoose = require("mongoose");

const LivreurModel = new mongoose.Schema({
  //key:{ type: mongoose.Schema.Types.ObjectId },
  name: { type: String, unique: true, required: true },
});

module.exports = mongoose.model("Livreur", LivreurModel);
