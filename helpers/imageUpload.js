const multer = require("multer");
const uploadDirectory = "./uploads";
const fs = require("fs");
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

exports.ImageHeplp = (req, res, ModelSchema) => {
  if (req.file) {
    const imagePath = req.file.path;
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send("Erreur d'image");
        return;
      }
      const newModel = new ModelSchema({
        ...req.body,
      });
      newModel.Image = {
        data: data,
        contentType: req.file.mimetype,
      };

      newModel
        .save()
        .then(() => {
          res.send("succès");
        })
        .catch((err) => {
          res.status(500).send("Erreur lors de l'enregistrement ");
        });

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
  } else {
    res.status(400).send("Aucun fichier image ");
  }
};
exports.ImageHealpUpdate = async (req, res, ModelSchema) => {
  const eventId = req.params.id;
    const updates = { ...req.body }
  if (req.file) {
    try {
      const data = await fs.promises.readFile(req.file.path);
      updates.Image = {
        data: data,
        contentType: req.file.mimetype,
      };
      await fs.promises.unlink(req.file.path);
    } catch (err) {
      console.error(err);
      res.status(500).send("Erreur  d'image");
      return;
    }
  }

  try {
    await ModelSchema.findByIdAndUpdate(eventId, updates);
    res.send("mis à jour avec succès");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur de la mise à jour ");
  }
};
