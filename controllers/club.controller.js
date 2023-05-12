const clubModel = require("../modules/Club.model");

exports.create = async (req, res) => {
  try {
    const club = new clubModel({ ...req.body });
    await club.save();
    res.status(201).send({
      message: "club created",
    });
  } catch (error) {
    res.status(500).send({
      message: `error : ${error.message}`,
    });
  }
};
exports.addEvent = async (req, res) => {
  try {
    const ClubId = req.params.id;
    const club = clubModel
      .findOne({ _id: ClubId })
      .then((doc) => {
        doc.listEvent = doc.listEvent.concat(req.body.listEvent);
        doc.save();
        res.status(201).send({
          message: "Prametetrage added successfully",
        });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    res.status(500).send({
      message: `error : ${error.message}`,
    }); 
  }
};

exports.RemoveEvent = async (req, res) => {
  try {
    const ClubId = req.params.id;
    const club = clubModel
      .findOne({ _id: ClubId })
      .then((doc) => {
        //  const ind = doc.listEvent.findIndex()

        doc.listEvent.forEach((element, i) => {
          console.log("element " + element + "i " + i);
          if (JSON.stringify(req.body.listEvent).includes(element)) {
            doc.listEvent.splice(i, req.body.listEvent.length);
          }
        });
        doc.save();
        res.status(201).send({
          message: "Prametetrage Removed successfully",
        });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    res.status(500).send({
      message: `error : ${error.message}`,
    });
  }
};
exports.update = async (req, res) => {
  const find = req.params.id;
  const newOne = req.body;
  try {
    await clubModel.findByIdAndUpdate(find, newOne);
    res.status(201).send({
      message: "club Modified",
    });
  } catch (error) {
    res.status(500).send({
      message: `error : ${error.message}`,
    });
  }
};
exports.delete = async (req, res) => {
  const find = req.params.id;

  try {
    await clubModel.findAndDelete(find);
    res.status(201).send({
      message: "club supprimer",
    });
  } catch (error) {
    res.status(500).send({
      message: `error : ${error.message}`,
    });
  }
};
exports.getAll = async (req, res) => {
  try {
    const clubs = await clubModel.find();
    console.log(clubs);
    res.status(201).send(clubs);
  } catch (error) {
    res.status(500).send({
      message: `error : ${error.message}`,
    });
  }
};
exports.getByEvent = async (req, res) => {
    const id = req.params.id
    try {
      const club = await clubModel.findById(id);
      console.log(club.listEvent);
      res.status(201).send(club.listEvent);
    } catch (error) {
      res.status(500).send({
        message: `error : ${error.message}`,
      });
    }
  };