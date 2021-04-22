const journey = require("../data/journey");

module.exports = {
  async index(req, res) {
    res.json({ message: "Welcome to roadster API" });
  },

  async create(req, res) {
    try {
      const journeyData = await journey.createJourney(req.body);
      res.json(journeyData);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  },

  async getJourney(req, res) {
    try {
      const journeyData = await journey.getJourney(req.params.id);
      res.json(journeyData);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  },

  async editJourney(req, res) {
    try {
      const journeyData = await journey.editJourney(req.body);
      res.json(journeyData);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  },
};
