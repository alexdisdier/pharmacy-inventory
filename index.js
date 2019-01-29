const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());

mongoose.connect(
  "mongodb://localhost/pharmacy-inventory", {
    useNewUrlParser: true
  }
);

const DrugModel = mongoose.model("Drug", {
  name: {
    type: String,
    default: ""
  },
  quantity: {
    type: Number
  }
})

// ===== ROUTES ====== //

// CREATE
app.post("/create", async (req, res) => {
  const nameInput = req.body.name.toUpperCase();
  try {
    const drug = await DrugModel.findOne({
      name: nameInput
    });
    if (drug === null) {
      const newDrug = addDrug(nameInput, req.body.quantity);
      await newDrug.save();
      res.json(newDrug);
    } else if (drug && nameInput !== drug.name) {
      const newDrug = addDrug(nameInput, req.body.quantity);
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
app.get("/", async (req, res) => {
  try {
    const drugs = await DrugModel.find();
    res.json(drugs);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

// UPDATE (ADD TO QUANTITY)
app.post("/drugs/add", async (req, res) => {
  try {
    if (req.body.id && req.body.quantity) {
      const drug = await DrugModel.findById(req.body.id);
      if (drug) {
        drug.quantity += req.body.quantity;
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
app.post("/drugs/remove", async (req, res) => {
  try {
    if (req.body.id && req.body.quantity) {
      const drug = await DrugModel.findById(req.body.id);
      if (drug.quantity > req.body.quantity) {
        drug.quantity -= req.body.quantity;
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
app.get("/drugs", async (req, res) => {
  try {
    const drug = await DrugModel.findOne({
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
app.post("/drugs/modify", async (req, res) => {
  try {
    const drug = await DrugModel.findById(req.body.id);
    const drugTemp = drug.name;
    drug.name = req.body.name.toUpperCase();
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
app.post("/drugs/delete", async (req, res) => {
  try {
    const drug = await DrugModel.findById(req.body.id);
    await DrugModel.deleteOne({
      _id: req.body.id
    });
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
})

// ====== FUNCTIONS ===== //
const addDrug = (name, quantity) => {
  return new DrugModel({
    name: name,
    quantity: quantity
  });
};

// ======== //

app.listen(3000, () => {
  console.log("Server started");
})