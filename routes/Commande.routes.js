const router = require("express").Router();
const CommandeController = require("../controllers/Commande.Controller");
module.exports = (app) => {
    router.post("/", CommandeController.create);
    router.patch("/id=" + ":id", CommandeController.update);
    router.delete("/id=" + ":id", CommandeController.delete);
    router.get("/Uid=" + ":id", CommandeController.getByUser);
    router.get("/id=" + ":id", CommandeController.getOne);
    router.patch("/Lid=" + ":id", CommandeController.addLivreur);
    app.use("/Commande", router);
  };