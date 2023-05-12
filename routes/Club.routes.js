const router = require("express").Router();
const ClubController = require("../controllers/club.controller");
module.exports = (app) => {
  router.post("/", ClubController.create);
  router.patch("/Aid=" + ":id", ClubController.addEvent);
  router.patch("/Rid=" + ":id", ClubController.RemoveEvent);
  router.patch("/id=" + ":id", ClubController.update);
  router.delete("/id=" + ":id", ClubController.delete);
  router.get("/", ClubController.getAll);
  router.get("/id=" + ":id", ClubController.getByEvent);
  app.use("/Club", router);
};
