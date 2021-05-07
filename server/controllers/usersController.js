const userData = require("../data/user");

module.exports = {
  async index(req, res) {
    // return all users from here, will be used later while doing user search
  },
  async create(req, res) {
    // create user
    try {
      const createdUser = await userData.createUser(req.body);
      res.json(createdUser);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  },
  async request(req, res) {
    // create user's journey request
  },
  async show(req, res) {
    // User profile page
    try {
      let id = req.params.user.id;
      if (!id) {
        res.json({ error: "Requested page is not found" });
      }
      const user = await userData.show(id);
      res.json(user);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  },
};
