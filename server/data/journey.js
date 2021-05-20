const { Journey } = require("../models");
const userData = require("./user");

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
  if (journey.description) checkString(journeyInfo.description, "description");
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

  if (!journey) throw new Error("Something went wrong while creating journey");

  return journeyObject(journey);
}

async function getJourney(id) {
  let journey = await Journey.findById(id);
  console.log(id);
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
    throw new Error("Could not find and update the specified journey!");

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

async function updateImage(id, images) {
  let updateInfo = await Journey.findOneAndUpdate(
    { _id: id },
    { $addToSet: { images } }
  );

  if (updateInfo.errors)
    throw new Error("Could not find and update the specified journey!");

  return await getJourney(id);
}

async function addMembers(id, users) {
  let journey = await getJourney(id);
  if (!journey) throw new Error("Journey not found");
  let updateInfo = await Journey.findOneAndUpdate(
    { _id: id },
    { $addToSet: { users } }
  );
  if (updateInfo.errors)
    throw new Error("Could not find and update the specified journey!");

  return await getMembers(id);
}

async function getMembers(id) {
  let members = [];
  let journey = await getJourney(id);
  if (!journey) throw new Error("Journey not found");
  if (journey.users) {
    const promises =
      journey.users && journey.users.map((userId) => userData.getUser(userId));
    members = await Promise.all(promises);
  }
  journey = await getJourney(id);
  return { members, journey };
}

async function getJourneyByCreator(userId) {
  const journeys = await Journey.find({ creatorId: userId });

  return journeys.map((journey) => journeyObject(journey));
}

module.exports = {
  createJourney,
  getJourney,
  updateJourney,
  getAllUserJourneys,
  getAllJourneys,
  updateImage,
  addCheckpoints,
  addMembers,
  getMembers,
  getJourneyByCreator,
};
