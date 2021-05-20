const invitationData = require("../data/invitation");
const journeyData = require("../data/journey");
const userData = require("../data/user");

async function create(req, res) {
  try {
    let invitationInfo = {
      journeyId: req.params.journeyId,
      status: "pending",
      acceptorId: req.body.acceptorId,
      userId: req.body.userId,
    };

    console.log(invitationInfo);
    const invitation = await invitationData.create(invitationInfo);
    res.json({ invitation: invitation });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

async function index(req, res) {
  try {
    let currentUserId = req.currentUser.uid;
    let invitations = await invitationData.getAllInvitations(currentUserId);
    console.log(invitations);
    res.json(invitations);
  } catch (e) {
    res.status(500).send(e);
  }
}

async function update(req, res) {
  try {
    const invitation = await invitationData.update(req.body);
    res.json(invitation);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

async function accept(req, res) {
  try {
    const invitation = await invitationData.accept(req.body);
    res.json({ invitation, message: "Invitation accepted" });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

async function reject(req, res) {
  try {
    const invitation = await invitationData.reject(req.body);
    res.json({ invitation, message: "Invitation accepted" });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

module.exports = {
  create,
  index,
  update,
  accept,
  reject,
};
