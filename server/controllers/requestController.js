const request = require("../data/request");

async function create(req, res) {
  try {
    let requestInfo = {
      journeyId: req.body.journeyId,
      userId: req.body.userId,
      initiatorId: req.body.initiatorId,
    };

    const requestData = await request.create(requestInfo);
    res.json(requestData);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

async function getAllSentInvitations(req, res) {
  try {
    const requestData = await request.getAllSentInvitations(req.params.id);
    res.json(requestData);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

async function getAllReceivedInvitations(req, res) {
  try {
    const requestData = await request.getAllReceivedInvitations(req.params.id);
    res.json(requestData);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

async function getRequest(req, res) {
  try {
    const requestData = await request.getRequest(req.params.id);
    res.json(requestData);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

async function update(req, res) {
  try {
    const requestData = await request.update(req.body);
    res.json(requestData);
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
  getRequest,
};
