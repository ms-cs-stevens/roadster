const { Journey } = require("../models");

journeyObject = (journey) => {
  return {
    _id: journey._id,
    origin: journey.origin,
    destination: journey.destination,
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
  };
};

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

async function editJourney(journeyData) {
  let updateInfo = await Journey.findOneAndUpdate(
    { _id: journeyData.id },
    { $addToSet: { checkpoints: journeyData.stop } }
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
  const journeys = await Journey.find({});
  return journeys.map((journey) => journeyObject(journey));
}

async function getPendingJourneys() {
  const journeys = await Journey.find({});
  return journeys.map((journey) => journeyObject(journey));
}

module.exports = {
  createJourney,
  getJourney,
  editJourney,
  getAllUserJourneys,
  getPendingJourneys,
  getAllJourneys,
};
