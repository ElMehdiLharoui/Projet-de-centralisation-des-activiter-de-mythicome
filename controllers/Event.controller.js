const EventModel = require("../modules/Event.model");
const multer = require("multer");
const fs = require("fs");

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
//const upload = multer({ storage: storage });
//(exports.create = upload.single("image")),

exports.create = (req, res) => {
  if (req.file) {
    const imagePath = req.file.path;

    fs.readFile(imagePath, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la lecture du fichier d'image");
        return;
      }

      const Image = {
        data: data,
        contentType: req.file.mimetype,
      };

      // Enregistrez le modèle avec les détails de l'image
      const newModel = new EventModel({
        name: req.body.name,
        description: req.body.description,
        clubName: req.body.clubName,
        ville: req.body.ville,
        paticipentMax: req.body.paticipentMax,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        dateFinal: req.body.dateFinal,
        Image: Image,
      });

      // Enregistrez le modèle dans la base de données
      newModel
        .save()
        .then(() => {
          // Le modèle a été enregistré avec succès
          res.send("Modèle enregistré avec succès");
        })
        .catch((err) => {
          // Gérer les erreurs
          console.error(err);
          res.status(500).send("Erreur lors de l'enregistrement du modèle");
        });

      // Supprimez le fichier temporaire après l'enregistrement
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
  } else {
    // Aucun fichier image fourni
    res.status(400).send("Aucun fichier image fourni");
  }
};
exports.update = async (req, res) => {
  const eventId = req.params.id;
  const updates = {
    name: req.body.name,
    description: req.body.description,
    clubName: req.body.clubName,
    ville: req.body.ville,
    paticipentMax: req.body.paticipentMax,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    dateFinal: req.body.dateFinal,
  };

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
      res.status(500).send("Erreur lors de la gestion du fichier d'image");
      return;
    }
  }

  try {
    await EventModel.findByIdAndUpdate(eventId, updates);
    res.send("Événement mis à jour avec succès");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la mise à jour de l'événement");
  }
};
exports.getAll = (req, res) => {
  EventModel.find()
    .then((events) => {
      res.send(events);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erreur lors de la récupération des événements");
    });
};
exports.delete = (req, res) => {
  const eventId = req.params.id;

  EventModel.findByIdAndRemove(eventId)
    .then(() => {
      res.send("Événement supprimé avec succès");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erreur lors de la suppression de l'événement");
    });
};
exports.addParticipant = async (req, res) => {
    console.log("req.body.listParticipent" + req.body.listParticipent);
    try {
    const EventId = req.params.id;
     EventModel.findOne({ _id: EventId })
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
    console.log("req.body.listParticipent" + req.body.listParticipent);
    try {
      const EventId = req.params.id;
       EventModel
        .findOne({ _id: EventId })
        .then((doc) => {
          //  const ind = doc.listEvent.findIndex()
  
          doc.listParticipent.forEach((element, i) => {
            console.log("element " + element + " i " + i);
            if ( JSON.stringify (req.body.listParticipent).includes(element)) {
            doc.listParticipent.splice(i, req.body.listParticipent.length);
            console.log('trueee');
            }
            console.log('not trueee');

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
