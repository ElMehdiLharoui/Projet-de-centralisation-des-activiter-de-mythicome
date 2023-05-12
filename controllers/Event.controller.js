const EventModel = require("../modules/Event.model");
const axios = require("axios");
const multer = require("multer");
const fs = require("fs");
const  ImageHeplp  = require("../helpers/imageUpload");
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

exports.create = async (req, res) => {

      await ImageHeplp.ImageHealperCreate(req,res,EventModel);
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
    EventModel.findOne({ _id: EventId })
      .then((doc) => {
        //  const ind = doc.listEvent.findIndex()

        doc.listParticipent.forEach((element, i) => {
          console.log("element " + element + " i " + i);
          if (JSON.stringify(req.body.listParticipent).includes(element)) {
            doc.listParticipent.splice(i, req.body.listParticipent.length);
            console.log("trueee");
          }
          console.log("not trueee");
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
