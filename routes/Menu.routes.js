const router = require("express").Router();
const multer = require("multer");
const MenuController = require("../controllers/Menu.Controller");
const ImageHeplp = require("../helpers/imageUpload");
const upload = multer({ storage: ImageHeplp.storage });
module.exports = (app) => {
    
  router.post("/", upload.single("Image"), MenuController.create);
  router.patch("/id="+":id", upload.single("Image"), MenuController.update);
  router.delete("/id="+":id",  MenuController.delete);
  router.get("/",  MenuController.getAll);

  app.use("/Menu", router);
};
 