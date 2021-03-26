const express = require("express");
const Ninjify = require("../models/ninjify");
const router = express.Router();

// Get All Route
router.get("/", async (req, res) => {
    try {
        const ninjify = await Ninjify.find()
        res.json(ninjify)
      } catch (err) {
        res.status(500).json({message: err.message})
      }
}); 

// Get One Route
router.get("/:id", getNinjify, (req, res) => {
    res.json(res.ninjify);
  });

// Create One Route
router.post("/", async (req, res) => {
    router.post("/", async (req, res) => {
        const ninjify = new Ninjify({
          ninjaName: req.body.ninjaName,
          techWord: req.body.techWord
        });
        try {
          const newNinjify = await ninjify.save();
          res.status(201).json({ newNinjify });
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
      });
});

// Edit One Route PUT version
router.put("/:id", getNinjify, async (req, res) => {
    try {
      const updatedNinjify = await res.ninjify.set(req.body);
      res.json(updatedNinjify);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// Edit One Route PATCH version
router.patch("/:id", getNinjify, async (req, res) => {
    if (req.body.ninjaName != null) {
      res.ninjify.ninjaName = req.body.ninjaName;
    }
    if (req.body.techWord != null) {
      res.ninjify.techWord = req.body.techWord;
    }
    try {
      const updatedNinjify = await res.ninjify.save();
      res.json(updatedNinjify);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  

// Delete One Route
router.delete("/:id", getNinjify, async (req, res) => {
    try {
      await res.ninjify.deleteOne();
      res.json({ message: "Ninjify has been deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;

//getNinjify middleware
async function getNinjify(req, res, next) {
    let ninjify;
    try {
      ninjify = await Ninjify.findById(req.params.id);
      if (ninjify == null) {
        return res.status(404).json({ message: "Cannot find Ninjify" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.ninjify = ninjify;
    next();
  }