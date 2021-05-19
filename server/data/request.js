const { Request } = require("../models");

requestObject = (request) => {
  return {
    _id: request._id,
    note: request.note,
    status: request.status,
    journeyId: request.journeyId,
    userId: request.userId,
    initiatorId: request.initiatorId,
  };
};

async function create(requestInfo) {
  let request = await Request.create({
    note: requestInfo.note,
    journeyId: requestInfo.journeyId,
    userId: requestInfo.userId,
    initiatorId: requestInfo.initiatorId,
  });

  if (!request) throw "Something went wrong while creating request";

  return requestObject(request);
}

async function getAllSentInvitations(id) {
  let requests = await Request.find({ initiatorId: id });
  return requests.map((request) => requestObject(request));
}

async function getAllReceivedInvitations(id) {
  let requests = await Request.find({ userId: id });
  return requests.map((request) => requestObject(request));
}

async function getRequest(id) {
  let request = await Request.findById(id);
  return requestObject(request);
}

async function update(requestObject) {
  let updateInfo = await Request.findOneAndUpdate(
    { _id: requestObject._id },
    { $set: { status: requestObject.status } }
  );

  return getRequest(requestObject._id);
}

module.exports = {
  create,
  getAllSentInvitations,
  getAllReceivedInvitations,
  getRequest,
  update,
};
