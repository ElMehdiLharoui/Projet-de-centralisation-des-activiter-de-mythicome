const multer = require("multer");
const uploadDirectory = "./uploads";
const genereteLink = require("./GenerteLink");
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
      newModel.Image = Date.now() + "-" + req.file.originalname;

      /*  contentType: req.file.mimetype,
      };*/

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
  const updates = { ...req.body };
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
exports.ImageHealperCreate = async (req, res, ModelSchema,newModel) => {
  try {
    if (!req.file) {
      return res.status(400).send("Aucune image ");
    }

    const imagePath = req.file.path;
    const data = await fs.promises.readFile(req.file.path);
    const response = await genereteLink.genereteLink(data);
    console.log("respense" + response);

    const imageUrl = response.data.data.link;
    console.log(imageUrl);

    // Enregistrez le modèle avec les détails de l'image
    
    newModel.Image = {
      url: imageUrl,
      contentType: req.file.mimetype,
    };

    // Enregistrez le modèle dans la base de données
    await ModelSchema.create(newModel);

    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(err);
      }
    });
    res.send("succès");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur de l'enregistrement");
  }
};

exports.ImageHealperUpdate = async (req, res, ModelSchema,newModel) => {
  try {
    if (!req.file) {
      return res.status(400).send("Aucun image ");
    }
    const id = req.params.id;

    // Enregistrez le modèle avec les détails de l'image
    const newModel ={
      ...req.body,
    };
    console.log("test");
    if (req.file) {
      const imagePath = req.file.path;
      const data = await fs.promises.readFile(req.file.path);
      const response = await genereteLink.genereteLinkUpdated(data);
      const imageUrl = response.data.data.link;
      try {
        newModel.Image = {
          url: imageUrl,
          contentType: req.file.mimetype,
        };
        
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error(err);
          }
        });
      } catch (err) {
        console.error(err);
        res.status(500).send("Erreur d'image");
        return;
      }
    }

    // Enregistrez le modèle dans la base de données
    await ModelSchema.findByIdAndUpdate(id, newModel);

    res.send("Modèle avec succès");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur du modèle");
  }
};
