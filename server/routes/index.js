const express = require("express");
const router = express.Router();
const authMiddleware = require("../firebase/authenticateToken");

const journeysController = require("../controllers/journeysController");
const usersController = require("../controllers/usersController");

// Journey's routes
router.get("/", journeysController.index);
router.get("/journey/:id", journeysController.show);
router.post("/journeys", authMiddleware, journeysController.create);
router.put("/journeys/:id", authMiddleware, journeysController.edit);

// user's routes
router.get("/users", authMiddleware, usersController.index);
router.get("/users/:id", authMiddleware, usersController.show);
router.post("/users", authMiddleware, usersController.create);
router.patch("/users/:id/update", authMiddleware, usersController.update);
router.post("/users/:id/request", authMiddleware, usersController.request);

router.get("*", async (req, res) => {
  res.status(404).json({ error: "Page not found!" });
});

module.exports = router;
