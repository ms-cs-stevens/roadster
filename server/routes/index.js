const express = require("express");
const router = express.Router();
const authMiddleware = require("../firebase/authenticateToken");

const journeysController = require("../controllers/journeysController");
const usersController = require("../controllers/usersController");
const requestController = require("../controllers/requestController");

// Journey's routes
router.get("/journeys", authMiddleware, journeysController.index);
router.get("/journeys/:id", authMiddleware, journeysController.show);
router.post("/journeys", authMiddleware, journeysController.create);
router.patch("/journeys/:id", authMiddleware, journeysController.update);
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
router.post("/users/search", usersController.searchUser);

/*
//request routes
//get all request by initiator
router.get("/requests/sent/:id", authMiddleware, requestController.getAllSentInvitations);
//get all received invitations
router.get("/requests/received/:id", authMiddleware, requestController.getAllReceivedInvitations);
//create request
router.post("/request/new", authMiddleware, requestController.create);
//modify request
router.patch("/request/modify",authMiddleware,  requestController.update);
//get request
router.get("/requests/:id", authMiddleware,requestController.getRequest);
*/

//request routes
//get all request by initiator
router.get("/requests/sent/:id", requestController.getAllSentInvitations);
//get all received invitations
router.get(
  "/requests/received/:id",
  requestController.getAllReceivedInvitations
);
//create request
router.post("/request/new", requestController.create);
//modify request
router.patch("/request/modify", requestController.update);
//get request
router.get("/request/:id", requestController.getRequest);

router.get("*", async (req, res) => {
  res.status(404).json({ error: "Page not found!" });
});

module.exports = router;
