const EventModel = require("../modules/Event.model");
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
  newModel = new EventModel({
    ...req.body, 
  });
      await ImageHeplp.ImageHealperCreate(req,res,EventModel,newModel);
};

exports.update = async (req, res) => {
  await ImageHeplp.ImageHealperUpdate(req,res,EventModel);
};
exports.getAll = (req, res) => {
  EventModel.find()
    .then((events) => {
      res.send(events);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erreur  de récupération");
    });
};
// get Event  BY Id
exports.delete = (req, res) => {
  const eventId = req.params.id;

  EventModel.findByIdAndRemove(eventId)
    .then(() => {
      res.send("Événement supprimé avec succès");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erreur  de  suppression ");
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
