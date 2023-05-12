const commandeModel = require("../modules/Commande.model");

exports.create = async (req, res) => {
  console.log(req.body);
  const newModel = new commandeModel({
    user: req.body.user,
    listOrder: req.body.listOrder,
    Statut: req.body.Statut,
    DateOreder: req.body.DateOreder,
    Livreur:req.body.Livreur,
  });
  try {
    //   const Commande = new commandeModel({ ...req.body });
    await newModel.save();
    res.status(201).send({
      message: "Commande created",
    });
  } catch (error) {
    res.status(500).send({
      message: `error : ${error.message}`,
    });
  }
};

exports.update = async function (req, res) {
  const find = req.params.id;
  const newOne = req.body;
  try {
    await commandeModel.findByIdAndUpdate(find, newOne);
    res.status(201).send({
      message: "Bien Modifie",
    });
  } catch (error) {
    res.status(500).send({
      message: `error : ${error.message}`,
    });
  }
};

exports.delete = async (req, res) => {
  const find = req.params.id;
  try {
    await commandeModel.findByIdAndDelete(find);
    res.status(201).send({
      message: "Bien supprimer",
    });
  } catch (error) {
    res.status(500).send({
      message: `error : ${error.message}`,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const all = await commandeModel.find();
    res.status(201).send(all);
  } catch (error) {
    res.status(500).send({
      message: `error : ${error.message}`,
    });
  }
};
exports.getOne = async (req, res) => {
  const id = req.params.id;
  try {
    const Commande = await commandeModel.findById(id);
    res.status(201).send(Commande);
  } catch (error) {
    res.status(500).send({
      message: `error : ${error.message}`,
    });
  }
};
exports.getByUser = async (req, res) => {
  const id = req.params.id;
  try {
    const Commande = await commandeModel.find().where("user", id);
    res.status(201).send(Commande);
  } catch (error) {
    res.status(500).send({
      message: `error : ${error.message}`,
    });
  }
};

exports.addLivreur = async (req, res) => {
    const commandeId= req.body.id;
    const   Livreur  = req.body.Livreur;
    try {
   await commandeModel.findByIdAndUpdate(
        commandeId,
        { $set: { Livreur: Livreur } },
        { new: true }
      )
        res.send("Événement mis à jour avec succès");
      } catch (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la mise à jour de l'événement");
      }

};
