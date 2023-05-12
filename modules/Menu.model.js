const mongoose = require("mongoose");
const TYPE  = {
    PETIT_DEJENER: 'PETIT_DEJENER',
    DEJUENER: 'DEJUENER',
    DINER: 'DINER',
  };
const MenuModel = new mongoose.Schema({
  plat: { type: String, unique: true, required: true },
  price: { type: Number, unique: false, required: true },
  description: {
    type: String,
    unique: false,
    required: true,
    minLength: 6,
    maxlength: 1024,
  },
  Image: { data: Buffer, contentType: String },
  vitamines: { type: Array, default: [] },
  typePlat: {
    type: String,
    enum: [TYPE.DEJUENER, TYPE.PETIT_DEJENER,TYPE.DINER], 
  },
});
module.exports = mongoose.model("menus",MenuModel); 