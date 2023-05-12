const userModel = require("../modules/User.model");
exports.addUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log({ email, password });
    const checkIfEmailExists = await userModel.find({ email });
    console.log(checkIfEmailExists);
    if (checkIfEmailExists.length > 0) {
      return res
        .status(202)
        .json({
          statusCode: 2,
          statusLabel: "error",
          data: "Email already taken",
        });
    }
    const newUser = new userModel({ email, password });
    await newUser.save();
    res
      .status(201)
      .json({
        statusCode: 0,
        statusLabel: "User registered successfully",
        isAdmin: newUser.isAdmin,
      });
  } catch (error) {
    res
      .status(500)
      .json({ statusCode: 1, statusLabel: "error", data: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({
      message: `error : ${error.message}`,
    });
  }
};

exports.update = async (req, res) => {
  console.log('heloo');
  const filter = req.params.id;
  const update = req.body;
  try {
    console.log(update);
    await userModel.findByIdAndUpdate(filter, update);
    res.status(200).send({
      message: 'user updated successfully',
    });
  } catch (error) {
    res.status(500).send({
      message: `error : ${error.message}`,
    });
  }
};
exports.delete = async (req, res) => {
  try {
    const doc = await userModel.findByIdAndDelete(req.params.id);
    console.log('jgf', doc);
    res.status(200).send({
      message: 'user deleted successfully',
    });
  } catch (error) {
    res.status(500).send({
      message: `error : ${error.message}`,
    });
  }
};
