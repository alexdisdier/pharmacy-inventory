const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(bodyParser.json());

/////////////////////////
// DATABASE CONNECTION //
/////////////////////////

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/pharmacy-inventory",
  {
    useNewUrlParser: true
  }
);

////////////////////////
// MODEL DECLARATION //
////////////////////////

// Initialize the collections
// Mongoose will take into account these collections
require("./models/drug");
require("./models/log");

////////////////////////
// ROUTES DECLARATION //
////////////////////////

const drugRoutes = require("./routes/drug");
const logRoutes = require("./routes/log");

// Activate the routes
app.use(drugRoutes);
app.use(logRoutes);

/////////////////////
// STARTING SERVER //
/////////////////////

// Manage pages not found
app.all("*", function(req, res) {
  res.status(400).send("Page not found");
});

// Choosing the ports to listen depending if we are in production using Heroku or in Development mode
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
