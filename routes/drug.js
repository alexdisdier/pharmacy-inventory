////////////////////
// DRUG ROUTE //
////////////////////

const express = require('express');
const router = express.Router();

const Drug = require("../models/drug");
const Log = require('../models/log');

// CREATE
// params body: drug name, quantity
router.post("/drug/create", async (req, res) => {
  const nameInput = req.body.name.toUpperCase();
  try {
    const drug = await Drug.findOne({
      name: nameInput
    });

    if (drug === null) {
      const newDrug = addDrug(nameInput, req.body.quantity);
      const newLog = addLog(new Date(), 'Created', newDrug);
      await newLog.save();
      await newDrug.save();
      res.json(newDrug);
    } else if (drug && nameInput !== drug.name) {
      const newDrug = addDrug(nameInput, req.body.quantity);
      const newLog = addLog(new Date(), 'Created', newDrug);
      await newLog.save();
      await newDrug.save();
      res.json(newDrug);
    } else {
      res.json({
        "error": {
          "message": "Drug already exists"
        }
      })
    }
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
})

// READ
router.get("/drug", async (req, res) => {
  try {
    const drugs = await Drug.find();
    res.json(drugs);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

// UPDATE (ADD TO QUANTITY)
// params body: id of drug, quantity
router.post("/drug/add", async (req, res) => {
  try {
    if (req.body.id && req.body.quantity) {
      const drug = await Drug.findById(req.body.id);
      if (drug) {
        drug.quantity += req.body.quantity;
        const newLog = addLog(new Date(), 'Updated added some quantity', drug);
        await newLog.save();
        await drug.save();
        res.json({
          message: `${drug.name}'s quantity has been updated to ${drug.quantity}`
        });
      } else {
        res.json({
          error: {
            message: "Bad request"
          }
        })
      }

    } else {
      res.status(400).json({
        message: "Missing parameter"
      });
    }
  } catch (error) {
    console.log('in catch');
    res.status(400).json({
      error: {
        message: "Bad request"
      }
    });
  }
});

// UPDATE (REMOVE FROM QUANTITY)
// params body: id of drug, quantity
router.post("/drug/remove", async (req, res) => {
  try {
    if (req.body.id && req.body.quantity) {
      const drug = await Drug.findById(req.body.id);
      if (drug.quantity > req.body.quantity) {
        drug.quantity -= req.body.quantity;
        const newLog = addLog(new Date(), 'Updated removed some quantity', drug);
        await newLog.save();
        await drug.save();
        res.json({
          message: `${drug.name}'s quantity has been updated to ${drug.quantity}`
        })
      } else {
        res.json({
          error: {
            message: "Invalid quantity"
          }
        })
      }

    } else {
      res.json({
        message: "Missing parameter"
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
})

// CHECK QUANTITY OF A DRUG
// params query: name of drug
router.get("/drug/find", async (req, res) => {
  try {
    const drug = await Drug.findOne({
      name: req.query.name
    })
    res.json({
      message: `We have ${drug.quantity} ${drug.name}`
    });
  } catch (error) {
    res.status(400).json({
      error: {
        message: "Bad request, This drug does not exist in our database"
      }
    });
  }
})

// MODIFY THE NAME OF A DRUG
// params body: id of drug, name
router.post("/drug/modify", async (req, res) => {
  try {
    const drug = await Drug.findById(req.body.id);
    const drugTemp = drug.name;
    drug.name = req.body.name.toUpperCase();
    const newLog = addLog(new Date(), 'Modify drugs name', drug);
    await newLog.save();
    await drug.save();
    res.json({
      message: `${drugTemp} has been changed to ${drug.name}`
    });
  } catch (error) {
    res.status(400).json({
      error: {
        message: "Bad request, This drug does not exist in our database"
      }
    })
  }
})

// DELETE A DRUG
// params body: id of drug
router.post("/drug/delete", async (req, res) => {
  try {
    const drug = await Drug.findById(req.body.id);
    await Drug.deleteOne({
      _id: req.body.id
    });
    const newLog = addLog(new Date(), 'Deleted a drug', drug);
    await newLog.save();
    res.json({
      message: `${drug.name} has been deleted`
    });
  } catch (error) {
    res.status(400).json({
      error: {
        message: "Bad request, This drug does not exist in our database"
      }
    })
  }
});

// ====== FUNCTIONS ===== //
const addDrug = (name, quantity) => {
  return new Drug({
    name: name,
    quantity: quantity
  });
};

const addLog = (date, type, details) => {
  return new Log({
    date: date,
    log: `${type}: ${details}`
  })
}

module.exports = router;