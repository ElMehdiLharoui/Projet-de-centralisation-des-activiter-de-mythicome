const router = require("express").Router();
const FormationController = require("../controllers/Formateur.cotroller");
module.exports = (app) => {
  router.post("/", FormationController.create);
  router.patch("/id=" + ":id", FormationController.update);
  router.delete("/id=" + ":id", FormationController.delete);
  router.get("/", FormationController.getAll);
  router.patch("/Aid=" + ":id", FormationController.addParticipant);
  router.patch("/Rid=" + ":id", FormationController.RemoveParticipant);
  app.use("/Formation", router);
};
