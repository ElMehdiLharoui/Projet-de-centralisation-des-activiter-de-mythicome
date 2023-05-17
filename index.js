// this is folder to manage the enverenement of express
require("dotenv").config();
const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
//  this  is to accept  data in json format
app.use(express.json());
// this is basically to decode the data
app.use(express.urlencoded());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST",
    "PUT",
    "PATCH",
    "FETCH"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Authorization"
  );
  next();
});

// this is express routes
require("./routes/Formation.routes")(app);
require("./routes/User.Routes")(app);
require("./routes/Club.routes")(app);
require("./routes/Event.routes")(app);
require("./routes/Menu.routes")(app);
require("./routes/Commande.routes")(app);
// connect to DB
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 // useFindAndModify: true,
};
async function mongoConnect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, options);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}

// start server
app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at http://localhost:${process.env.PORT}`),
    mongoConnect();
});
