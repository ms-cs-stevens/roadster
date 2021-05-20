const journeyData = require("../data/journey");
const userData = require("../data/user");
const invitationData = require("../data/invitation");

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

preventJourneyEdit = (currentUser, journey) => {
  return (
    currentUser.uid !== journey.creatorId &&
    (!journey.editable || !journey.users.includes(currentUser.uid))
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
          data = await journeyData.getAllUserJourneys(req.currentUser.uid);
          break;
        case "all":
          data = await journeyData.getAllJourneys();
          break;
        default:
          throw "Invalid Journey filter. Filter should be either 'user', 'all'";
      }

      const journeys = data.map((journey) => getJourneyWithCreator(journey));
      res.json({ journeys: await Promise.all(journeys) });
    } catch (e) {
      console.log(e);
      res.status(422).json({ message: e.message });
    }
  },

  async create(req, res) {
    try {
      validateJourneyInfo(req.body);
    } catch (error) {
      res.status(422).json({ message: e });
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

      const journey = await journeyData.createJourney(journeyInfo);
      res.json(journey);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e });
    }
  },

  async show(req, res) {
    try {
      const journey = await journeyData.getJourney(req.params.id);
      const invitation = await invitationData.getInvitation(
        journey._id,
        req.currentUser.uid
      );
      res.json({ journey, invitation });
    } catch (e) {
      console.log(e);
      res.status(404).json({ message: e });
    }
  },

  async update(req, res) {
    try {
      const journey = await journeyData.getJourney(req.params.id);
      if (preventJourneyEdit(req.currentUser, journey)) {
        return res
          .status(403)
          .json({ message: "You are not authorized to perform this request" });
      }
    } catch (error) {
      return res.status(404).json({ message: "Journey not found" });
    }

    try {
      const journey = await journeyData.updateJourney(req.params.id, req.body);
      res.json({ journey });
    } catch (e) {
      console.log("msg", e.message);
      res.status(500).json({ message: e.message });
    }
  },

  async updateImage(req, res) {
    try {
      const journey = await journeyData.getJourney(req.params.id);
      if (preventJourneyEdit(req.currentUser, journey)) {
        return res
          .status(403)
          .json({ message: "You are not authorized to perform this request" });
      }
    } catch (error) {
      return res.status(404).json({ message: "Journey not found" });
    }

    try {
      const journey = await journeyData.updateImage(
        req.params.id,
        req.body.imageArray
      );
      res.json(journey);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e });
    }
  },

  async addCheckpoints(req, res) {
    try {
      const journey = await journeyData.getJourney(req.params.id);
      if (preventJourneyEdit(req.currentUser, journey)) {
        return res
          .status(403)
          .json({ message: "You are not authorized to perform this request" });
      }
    } catch (error) {
      return res.status(404).json({ message: "Journey not found" });
    }

    try {
      const journey = await journeyData.addCheckpoints(
        req.params.id,
        req.body.checkpoints
      );
      res.json(journey);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: e });
    }
  },

  async getMembers(req, res) {
    try {
      let journey = await journeyData.getJourney(req.params.id);
      if (!journey) throw new Error("Journey not found");
      let data = await journeyData.getMembers(req.params.id);
      res.json({ members: data.members, journey: data.journey });
    } catch (e) {
      res.status(404).json({ error: e.message });
    }
  },

  async addMembers(req, res) {
    try {
      let journey = await journeyData.getJourney(req.params.id);
      if (!journey) throw new Error("Journey not found");
      let data = await journeyData.addMembers(req.params.id, req.body.users);
      res.json({ members: data.members, journey: data.journey });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: e });
    }
  },
};
