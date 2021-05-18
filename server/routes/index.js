const express = require("express");
const router = express.Router();
const authMiddleware = require("../firebase/authenticateToken");

const journeysController = require("../controllers/journeysController");
const usersController = require("../controllers/usersController");

// Journey's routes
router.get("/journeys", authMiddleware, journeysController.index);
router.get("/journeys/:id", authMiddleware, journeysController.show);
router.post("/journeys", authMiddleware, journeysController.create);
router.put("/journeys/:id", authMiddleware, journeysController.edit);
router.patch(
  "/journey/updateImage/:id",
  authMiddleware,
  journeysController.updateImage
);
router.post(
  "/journeys/:id/checkpoints",
  authMiddleware,
  journeysController.addCheckpoints
);

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
