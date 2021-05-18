const journey = require("../data/journey");
const userData = require("../data/user");

validateJourneyInfo = (journey) => {
  if (!journey) throw "Provide journey details";
  if (!journey.origin) throw "Provide origin";
  if (!journey.destination) throw "Provide destination";
  if (!journey.budget) throw "Provide budget";
  if (!journey.occupancy) throw "Provide occupancy";
  if (!journey.name) throw "Provide journey name";
};

getJourneyWithCreator = async (journey) => {
  const user = await userData.getUser(journey.creatorId);
  journey.creator = `${user.firstName} ${user.lastName}`;
  return journey;
};

module.exports = {
  async index(req, res) {
    try {
      const journeysFilter = req.query.filter;
      let data;
      switch (journeysFilter) {
        case "user":
          data = await journey.getAllUserJourneys(req.currentUser.uid);
          break;
        case "all":
          data = await journey.getAllJourneys();
          break;
        case "pending":
          data = await journey.getAllJourneys();
          break;
        default:
          throw new Error(
            "Invalid Journey filter. Filter should be either 'user', 'all' or 'pending'"
          );
      }

      const journeys = data.map((journey) => getJourneyWithCreator(journey));
      res.json({ journeys: await Promise.all(journeys) });
    } catch (e) {
      res.sendStatus(422).json({ error: e.message });
    }
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
        creatorId: req.currentUser.uid,
        name: req.body.name,
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

  async updateImage(req, res) {
    try {
      const journeyData = await journey.updateImage(
        req.params.id,
        req.body.imageArray
      );
      res.json(journeyData);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  },
};
