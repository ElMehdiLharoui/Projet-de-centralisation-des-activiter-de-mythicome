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
exports.create = (req, res) => {
    const Model = {
        plat: req.body.plat,
        price: req.body.price,
        description: req.body.description,
        vitamines: req.body.vitamines,
        typePlat: req.body.typePlat,
      };
    ImageHeplp.ImageHeplp(req,res,MenuModel);
};

exports.update = async (req, res) => {
  const eventId = req.params.id;
  const updates = {
    plat: req.body.plat,
    price: req.body.price,
    description: req.body.description,
    vitamines: req.body.vitamines,
    typePlat: req.body.typePlat,
  };

  if (req.file) {
    try {
      const data = await fs.promises.readFile(req.file.path);
      updates.Image =  Date.now() + "-" + req.file.originalname, 
        
      await fs.promises.unlink(req.file.path);
    } catch (err) {
      console.error(err);
      res.status(500).send("Erreur lors de la gestion du fichier d'image");
      return;
    }
  }

  try {
    await MenuModel.findByIdAndUpdate(eventId, updates);
    res.send("Événement mis à jour avec succès");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur de la mise à jour ");
  }
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
      res.send("Événement supprimé avec succès");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erreur");
    });
};
