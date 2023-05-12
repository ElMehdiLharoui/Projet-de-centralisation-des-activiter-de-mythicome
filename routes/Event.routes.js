const router = require("express").Router();
const multer = require("multer");
//const storage = require("../controllers/Event.controller");
const EventController = require("../controllers/Event.controller");
const upload = multer({ storage: EventController.storage });
module.exports = (app) => {
  console.log("log" + JSON.stringify(EventController.storage));
  console.log("log" + JSON.stringify(upload));
  router.post("/", upload.single("Image"), EventController.create);
  router.patch("/id="+':id', upload.single("Image"), EventController.update);
  router.get("/", EventController.getAll);
  router.delete("/id="+":id", EventController.delete);
  router.patch("/Aid=" + ":id", EventController.addParticipant);
  router.patch("/Rid=" + ":id", EventController.RemoveParticipant);
  app.use("/Event", router); 
};
