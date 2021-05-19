const { Journey } = require("../models");

journeyObject = (journey) => {
  return {
    _id: journey._id,
    origin: journey.origin,
    destination: journey.destination,
    description: journey.description,
    occupancy: journey.occupancy,
    creatorId: journey.creatorId,
    editable: journey.editable,
    budget: journey.budget,
    checkpoints: journey.checkpoints,
    startDate: journey.startDate,
    endDate: journey.endDate,
    name: journey.name,
    modifiedBy: journey.modifiedBy,
    users: journey.users,
    images: journey.images,
    updatedAt: journey.updatedAt,
  };
};

function checkString(string, name) {
  if (!string || string.trim().length <= 0) throw `Please provide a ${name}!`;
}

function checkNumber(num, name) {
  if (!num || Number.isNaN(parseInt(num))) throw `Please provide valid ${name}`;
}

function validateUpdateInfo(journeyInfo, journey) {
  let updatedObject = {};
  checkString(journeyInfo.name, "name");
  checkString(journeyInfo.description, "description");
  checkNumber(journeyInfo.budget, "budget");
  checkNumber(journeyInfo.occupancy, "members");

  if (journeyInfo.name != journey.name) {
    updatedObject.name = journeyInfo.name;
  }
  if (journeyInfo.description != journey.description) {
    updatedObject.description = journeyInfo.description;
  }

  if (journeyInfo.budget != journey.budget) {
    updatedObject.budget = journeyInfo.budget;
  }

  if (journeyInfo.occupancy != journey.occupancy) {
    updatedObject.occupancy = journeyInfo.occupancy;
  }

  if (journeyInfo.editable != journey.editable) {
    updatedObject.editable = journeyInfo.editable;
  }

  if (Object.keys(updatedObject).length <= 0)
    throw `No information has been provided to update the specified journey`;
}

async function createJourney(journeyInfo) {
  let journey = await Journey.create({
    origin: journeyInfo.origin,
    destination: journeyInfo.destination,
    occupancy: journeyInfo.occupancy,
    editable: journeyInfo.editable,
    budget: journeyInfo.budget,
    creatorId: journeyInfo.creatorId,
    modifiedBy: journeyInfo.creatorId,
    name: journeyInfo.name,
  });

  if (!journey) throw "Something went wrong while creating journey";

  return journeyObject(journey);
}

async function getJourney(id) {
  let journey = await Journey.findById(id);
  return journeyObject(journey);
}

async function updateJourney(id, journeyData) {
  const journey = await this.getJourney(id);

  if (!journey) throw "Journey not found";

  validateUpdateInfo(journeyData, journey);

  const updateInfo = await Journey.findOneAndUpdate(
    { _id: id },
    { $set: journeyData },
    { runValidators: true }
  );

  if (updateInfo.errors)
    throw "Could not find and update the specified journey!";

  return await this.getJourney(id);
}

async function addCheckpoints(id, checkpoints) {
  let updateInfo = await Journey.findOneAndUpdate(
    { _id: id },
    { checkpoints: checkpoints }
  );

  return journeyObject(updateInfo);
}

async function getAllUserJourneys(userId) {
  const journeys = await Journey.find()
    .or([{ creatorId: userId }, { users: { $all: [userId] } }])
    .sort({
      createdAt: "desc",
    });

  return journeys.map((journey) => journeyObject(journey));
}

async function getAllJourneys() {
  const journeys = await Journey.find({}).sort({
    createdAt: "desc",
  });
  return journeys.map((journey) => journeyObject(journey));
}

async function getPendingJourneys() {
  const journeys = await Journey.find({});
  return journeys.map((journey) => journeyObject(journey));
}

async function updateImage(id, imagesArray) {
  let updateInfo = await Journey.findOneAndUpdate(
    { _id: id },
    { $set: { images: imagesArray } }
  );

  if (updateInfo.errors)
    throw "Could not find and update the specified journey!";

  return await getJourney(id);
}

module.exports = {
  createJourney,
  getJourney,
  updateJourney,
  getAllUserJourneys,
  getPendingJourneys,
  getAllJourneys,
  updateImage,
  addCheckpoints,
};
