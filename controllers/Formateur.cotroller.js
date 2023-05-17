const FormationModel = require("../modules/Formation.model");

exports.create = async (req, res) => {
  try {
    const Formation = new FormationModel({ ...req.body });
    await Formation.save();
    res.status(201).send({
      message: "Formation created",
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
    await FormationModel.findByIdAndUpdate(find, newOne);
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
    await FormationModel.findByIdAndDelete(find);
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
    const all = await FormationModel.find();
    res.status(201).send(all);
  } catch (error) {
    res.status(500).send({
      message: `error : ${error.message}`,
    });
  }
};

exports.addParticipant = async (req, res) => {
 
  try {
    const FormationId = req.params.id;
    FormationModel.findOne({ _id: FormationId })
      .then((doc) => {
        doc.listParticipent = doc.listParticipent.concat(
          req.body.listParticipent
        );
        doc.save();
        res.status(201).send({
          message: "USER added successfully",
        });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    res.status(500).send({
      message: `error : ${error.message}`,
    });
  }
};

exports.RemoveParticipant = async (req, res) => {
  try {
    const FormationId = req.params.id;
    FormationModel.findOne({ _id: FormationId })
      .then((doc) => {
        doc.listParticipent.forEach((element, i) => {
          if (JSON.stringify(req.body.listParticipent).includes(element)) {
            doc.listParticipent.splice(i, req.body.listParticipent.length);
          }
        });
        doc.save();
        res.status(201).send({
          message: "USER removed successfully",
        });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    res.status(500).send({
      message: `error : ${error.message}`,
    });
  }
};