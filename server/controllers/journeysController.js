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

preventJourneyEdit = () => {
  return (
    req.currentUser.uid !== journey.creatorId &&
    (!journey.editable || !journey.users.include(req.currentUser.uid))
  );
};

// TODO: Add validations if required

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
      res.sendStatus(422).json({ message: e.message });
    }
  },

  async create(req, res) {
    try {
      validateJourneyInfo(req.body);
    } catch (error) {
      res.sendStatus(422).json({ message: e });
    }

    try {
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
      res.sendStatus(500).json({ message: e });
    }
  },

  async show(req, res) {
    try {
      const journeyData = await journey.getJourney(req.params.id);
      res.json(journeyData);
    } catch (e) {
      console.log(e);
      res.sendStatus(404).json({ message: e });
    }
  },

  async update(req, res) {
    if (preventJourneyEdit()) {
      return res
        .sendStatus(403)
        .json({ message: "You are not authorized to perform this request" });
    }

    try {
      const journeyData = await journey.updateJourney(req.params.id, req.body);
      res.json({ data: journeyData });
    } catch (e) {
      console.log(e);
      res.sendStatus(500).json({ message: e });
    }
  },

  async updateImage(req, res) {
    if (preventJourneyEdit()) {
      return res
        .sendStatus(403)
        .json({ message: "You are not authorized to perform this request" });
    }

    try {
      const journeyData = await journey.updateImage(
        req.params.id,
        req.body.imageArray
      );
      res.json(journeyData);
    } catch (e) {
      console.log(e);
      res.sendStatus(500).json({ message: e });
    }
  },

  async addCheckpoints(req, res) {
    if (preventJourneyEdit()) {
      return res
        .sendStatus(403)
        .json({ message: "You are not authorized to perform this request" });
    }

    try {
      const journeyData = await journey.addCheckpoints(
        req.params.id,
        req.body.checkpoints
      );
      res.json(journeyData);
    } catch (error) {
      console.log(error);
      res.sendStatus(500).json({ message: e });
    }
  },
};
