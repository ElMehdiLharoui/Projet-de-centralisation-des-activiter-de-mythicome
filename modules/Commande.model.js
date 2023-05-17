const mongoose = require("mongoose");
const { Schema } = mongoose;
const Statut  = {
    EN_COUR: "EN_COUR",
    LIVRER: "LIVRER",
    
  };
const CommandeSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  listOrder: [{
        nom: { type: String, required: true },
        quantite: { type: Number, required: true }
  }],
  Statut: { type: String, enum:[Statut.EN_COUR,Statut.LIVRER] },
  DateOreder: Date,
  ReferenceComande :{type :String,required:false,unique:true},
});

module.exports = mongoose.model("commandes", CommandeSchema);
