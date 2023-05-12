const LivreurModel = require("../modules/Livreur.model");

exports.create = async (req, res) => {
  try {
    const Livreur = new LivreurModel({ ...req.body });
    await Livreur.save();
    res.status(201).send({
      message: "Livreur created",
    });
  } catch (error) {
    res.status(500).send({
      message: `error : ${error.message}`,
    });
  }
};
exports.update = async function s(req, res) {
  const find = req.params.id;
  const newOne = req.body;
  try {
    await LivreurModel.findByIdAndUpdate(find, newOne);
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
    await LivreurModel.findByIdAndDelete(find);
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
    const all = await LivreurModel.find();
    res.status(201).send(all);
  } catch (error) {
    res.status(500).send({
      message: `error : ${error.message}`,
    });
  }
};
