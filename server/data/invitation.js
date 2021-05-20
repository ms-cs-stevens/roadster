const { Invitation, Journey } = require("../models");
const userData = require("./user");
const journeyData = require("./journey");

invitationObject = (invitation) => {
  return {
    _id: invitation._id,
    status: invitation.status,
    journeyId: invitation.journeyId,
    userId: invitation.userId,
    acceptorId: invitation.acceptorId,
  };
};

async function create(invitationInfo) {
  let invitation = await Invitation.create({
    journeyId: invitationInfo.journeyId,
    userId: invitationInfo.userId,
    acceptorId: invitationInfo.acceptorId,
  });

  if (!invitation) throw "Something went wrong while creating invitation";

  return invitationObject(invitation);
}

async function getAllInvitations(userId) {
  let invitations = await Invitation.find({
    acceptorId: userId,
    status: "pending",
  });
  let mappedInvitations = [];

  for (const invite of invitations) {
    const user = await userData.getUser(invite.userId);
    const journey = await journeyData.getJourney(invite.journeyId);
    mappedInvitations.push({ user, journey, invitation: invite });
  }
  return mappedInvitations;
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

module.exports = {
  create,
  getAllInvitations,
  getInvitation,
  update,
};
