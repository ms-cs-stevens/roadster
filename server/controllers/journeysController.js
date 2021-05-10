const journey = require("../data/journey");

validateJourneyInfo = (journey) => {
  if (!journey) throw "Provide journey details";
  if (!journey.origin) throw "Provide origin";
  if (!journey.destination) throw "Provide destination";
  if (!journey.budget) throw "Provide budget";
  if (!journey.occupancy) throw "Provide occupancy";
  if (!journey.name) throw "Provide journey name";
};

module.exports = {
  async index(req, res) {
    res.json({ message: "Welcome to roadster API" });
  },

  async create(req, res) {
    try {
      validateJourneyInfo(req.body);
      let journeyInfo = {
        origin: req.body.origin,
        destination: req.body.destination,
        budget: parseInt(req.body.budget),
        occupancy: parseInt(req.body.occupancy),
        editable: req.body.editable,
        creator_id: req.currentUser.uid,
      };

      const journeyData = await journey.createJourney(journeyInfo);
      res.json(journeyData);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  },

  async show(req, res) {
    try {
      const journeyData = await journey.getJourney(req.params.id);
      res.json(journeyData);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  },

  async edit(req, res) {
    try {
      const journeyData = await journey.editJourney(req.body);
      res.json(journeyData);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  },
};
