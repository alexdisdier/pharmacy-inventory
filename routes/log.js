////////////////
// LOG ROUTE //
///////////////

const express = require('express');
const router = express.Router();

const Log = require('../models/log');

// READ LOG DATABASE
router.get("/log", async (req, res) => {
  try {
    const logs = await Log.find();
    res.json(logs);
  } catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
});

module.exports = router;