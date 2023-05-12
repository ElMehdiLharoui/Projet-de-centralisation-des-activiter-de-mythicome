const router = require("express").Router();
const LivreurController = require("../controllers/Livreur.cotroller");
module.exports = (app) => {
  router.post("/", LivreurController.create);
  router.patch("/id=" + ":id", LivreurController.update);
  router.delete("/id=" + ":id", LivreurController.delete);
  router.get("/", LivreurController.getAll);


  app.use("/Livreur", router);
};
