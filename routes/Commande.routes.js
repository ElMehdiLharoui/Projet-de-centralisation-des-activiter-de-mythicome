const router = require("express").Router();
const CommandeController = require("../controllers/Commande.Controller");
module.exports = (app) => {
    router.post("/", CommandeController.create);
    router.patch("/id=" + ":id", CommandeController.update);
    router.delete("/id=" + ":id", CommandeController.delete);
    router.get("/Uid=" + ":id", CommandeController.getByUser);
    router.get("/id=" + ":id", CommandeController.getOne);
    app.use("/Commande", router);
  };