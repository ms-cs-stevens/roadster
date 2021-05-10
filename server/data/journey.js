const { Journey } = require("../models");

journeyObject = (journey) => {
  return {
    _id: journey._id,
    origin: journey.origin,
    destination: journey.destination,
    occupancy: journey.occupancy,
    creator_id: journey.creator_id,
    editable: journey.editable,
    budget: journey.budget,
  };
};

async function createJourney(journeyInfo) {
  let journey = await Journey.create({
    origin: journeyInfo.origin,
    destination: journeyInfo.destination,
    occupancy: journeyInfo.occupancy,
    editable: journeyInfo.editable,
    budget: journeyInfo.budget,
    creator_id: journeyInfo.creator_id,
    modified_by: journeyInfo.creator_id,
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

module.exports = {
  createJourney,
  getJourney,
  editJourney,
};
