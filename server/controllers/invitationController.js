const invitationData = require("../data/invitation");

async function create(req, res) {
  try {
    let invitationInfo = {
      journeyId: req.params.journeyId,
      status: "pending",
      userId: req.currentUser.uid,
      // initiatorId: req.currentUser.uid,
    };

    console.log(invitationInfo);
    const invitation = await invitationData.create(invitationInfo);
    res.json({ invitation: invitation });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

async function getAllSentInvitations(req, res) {
  try {
    const invitation = await invitationData.getAllSentInvitations(
      req.params.id
    );
    res.json(invitation);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

async function getAllReceivedInvitations(req, res) {
  try {
    const invitation = await invitationData.getAllReceivedInvitations(
      req.params.id
    );
    res.json(invitation);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

async function getAllUserInvitations(req, res) {
  try {
    const invitations = await invitationData.getAllUserInvitations(
      req.currentUser.uid
    );
    console.log("contr", invitations);
    res.json({ invitations });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
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

module.exports = {
  create,
  getAllReceivedInvitations,
  update,
  getAllSentInvitations,
  getAllUserInvitations,
};
