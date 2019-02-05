////////////////
// DRUG MODEL //
////////////////

const mongoose = require("mongoose");

const Drug = mongoose.model("Drug", {
  name: {
    type: String,
    default: "",
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

module.exports = Drug;