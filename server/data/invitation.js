const { Invitation } = require("../models");

invitationObject = (invitation) => {
  return {
    _id: invitation._id,
    status: invitation.status,
    journeyId: invitation.journeyId,
    userId: invitation.userId,
  };
};

async function create(invitationInfo) {
  let invitation = await Invitation.create({
    journeyId: invitationInfo.journeyId,
    userId: invitationInfo.userId,
    initiatorId: invitationInfo.initiatorId,
  });

  if (!invitation) throw "Something went wrong while creating invitation";

  return invitationObject(invitation);
}

async function getAllSentInvitations(id) {
  let invitations = await Invitation.find({ initiatorId: id });
  return invitations.map((invitation) => invitationObject(invitation));
}

async function getAllReceivedInvitations(id) {
  let invitations = await Invitation.find({ userId: id });
  return invitations.map((invitation) => invitationObject(invitation));
}

async function getInvitation(journeyId, userId) {
  const invitation = await Invitation.findOne({
    journeyId: journeyId,
    userId: userId,
  });
  return invitation ? invitationObject(invitation) : null;
}

async function update(invitationObject) {
  let updateInfo = await Invitation.findOneAndUpdate(
    { _id: invitationObject._id },
    { $set: { status: invitationObject.status } }
  );

  return getInvitation(invitationObject._id);
}

async function getAllUserInvitations(userId) {
  const invitations = await Invitation.find({
    userId: userId,
    status: "pending",
  });
  return invitations.map((invitation) => invitationObject(invitation));
}

module.exports = {
  create,
  getAllSentInvitations,
  getAllReceivedInvitations,
  getInvitation,
  update,
  getAllUserInvitations,
};
