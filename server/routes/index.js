const express = require("express");
const router = express.Router();
const authMiddleware = require("../firebase/authenticateToken");

const journeysController = require("../controllers/journeysController");
const usersController = require("../controllers/usersController");

router.get("/", journeysController.index);
router.post("/createJourney", authMiddleware, journeysController.create);
router.get("/journey/:id", journeysController.getJourney);
router.post("/editJourney", authMiddleware, journeysController.editJourney);

// user's routes
router.get("/users", usersController.index);
router.get("/users/:id", usersController.show);
router.post("/users", authMiddleware, usersController.create);
router.post("/users/:id/request", authMiddleware, usersController.request);

router.get("*", async (req, res) => {
  res.status(404).json({ error: "Page not found!" });
});

module.exports = router;
