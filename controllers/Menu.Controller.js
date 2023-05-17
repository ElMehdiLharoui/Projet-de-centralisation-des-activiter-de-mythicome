const MenuModel = require("../modules/Menu.model");
const fs = require("fs");
const ImageHeplp = require("../helpers/imageUpload");

const multer = require("multer");
const uploadDirectory = "./uploads";

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}
const storage = multer.diskStorage({
  destination: uploadDirectory,
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
console.log("log33" + JSON.stringify(storage));
exports.storage = storage;
exports.create = async (req, res) => {
  console.log("type"+typeof(req.body.vitamines));
  newModel = new MenuModel({
    ...req.body,
    vitamines: req.body.vitamines.split(",") || [],
  });
  await ImageHeplp.ImageHealperCreate(req, res, MenuModel, newModel);
};

exports.update = async (req, res) => {
  console.log("type"+typeof(req.body.vitamines));
  const vitamines = req.body.vitamines.split(",") || [];
  newModel = {
    ...req.body,
    vitamines: vitamines,
  };
  await ImageHeplp.ImageHealpUpdate(req, res, MenuModel, newModel);
};
exports.getAll = (req, res) => {
  MenuModel.find()
    .then((events) => {
      res.send(events);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erreur ");
    });
};

exports.delete = (req, res) => {
  const eventId = req.params.id;

  MenuModel.findByIdAndRemove(eventId)
    .then(() => {
      res.send("supprimé avec succès");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erreur");
    });
};
