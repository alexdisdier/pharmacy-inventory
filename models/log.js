////////////////
// DRUG MODEL //
////////////////

const mongoose = require("mongoose");

const Log = mongoose.model("Log", {
  date: {
    type: Date,
    default: new Date(),
    required: true
  },
  log: {
    type: String,
    required: true
  }
});

module.exports = Log;