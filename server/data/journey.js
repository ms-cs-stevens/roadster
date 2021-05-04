const { Journey } = require("../models");

journeyObject = (journey) => {
  return {
    _id: journey._id,
    source: journey.source,
    destination: journey.destination,
    occupancy: journey.occupancy,
    creator_id: journey.creator_id,
  };
};

async function createJourney(journeyInfo) {
  let journey = await Journey.create({
    source: journeyInfo.source,
    destination: journeyInfo.destination,
    occupancy: journeyInfo.occupancy,
    stops: journeyInfo.checkpoints,
    creator_id: "user1",
    modified_by: "user1",
  });

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

module.exports = {
  createJourney,
  getJourney,
  editJourney,
};
