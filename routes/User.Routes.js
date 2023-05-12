const router = require("express").Router();
const UserController = require("../controllers/auth.cotroller");
module.exports = (app) => {
  router.post("/", UserController.addUser);
  router.get("/", UserController.getAll);
  router.patch("/id=" + ":id", UserController.update);
  router.delete("/id=" + ":id", UserController.delete);
  app.use("/user", router);
};
