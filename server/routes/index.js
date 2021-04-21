const express = require("express");
const router = express.Router();
const journeysController = require("../controllers/journeysController");

router.get("/", journeysController.index);

router.get("*", async (req, res) => {
  res.status(404).json({ error: "Page not found!" });
});

module.exports = router;
