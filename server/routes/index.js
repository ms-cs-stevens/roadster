const express = require("express");
const router = express.Router();
const authMiddleware = require("../firebase/authenticateToken");

const journeysController = require("../controllers/journeysController");
const usersController = require("../controllers/usersController");
const invitationController = require("../controllers/invitationController");

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
router.get(
  "/journeys/:id/members",
  authMiddleware,
  journeysController.getMembers
);
router.post(
  "/journeys/:id/members",
  authMiddleware,
  journeysController.addMembers
);

// user's routes
router.get("/users", authMiddleware, usersController.index);
router.get("/users/:id", authMiddleware, usersController.show);
router.post("/users", authMiddleware, usersController.create);
router.patch("/users/:id/update", authMiddleware, usersController.update);

/*
//request routes
//get all request by initiator
//get all received invitations
router.get("/requests/received/:id", authMiddleware, invitationController.getAllReceivedInvitations);
//create request
//modify request
router.patch("/request/modify",authMiddleware,  invitationController.update);
//get request
router.get("/requests/:id", authMiddleware,invitationController.getRequest);
*/
router.post(
  "/requests/:journeyId",
  authMiddleware,
  invitationController.create
);
router.get(
  "/requests",
  authMiddleware,
  invitationController.getAllUserInvitations
);
// router.get(
//   "/requests/sent/:id",
//   authMiddleware,
//   invitationController.getAllSentInvitations
// );

//request routes
//get all request by initiator
// router.get("/requests/sent/:id", invitationController.getAllSentInvitations);
//get all received invitations
// router.get(
//   "/requests/received/:id",
//   invitationController.getAllReceivedInvitations
// );
// //create request
// router.post("/request/new", invitationController.create);
// //modify request
// router.patch("/request/modify", invitationController.update);
// //get request
// router.get("/request/:id", invitationController.getRequest);

router.get("*", async (req, res) => {
  res.status(404).json({ error: "Page not found!" });
});

module.exports = router;
