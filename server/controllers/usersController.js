const userData = require("../data/user");
const Redis = require("ioredis");
const redis = new Redis();

module.exports = {
  async index(req, res) {
    // return all users from here, will be used later while doing user search
    try {
      const users = await userData.getAllUsers();
      res.json(users);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
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
    let id = req.params.id;
    if (id && id.trim().length) {
      try {
        // get cached user
        const cachedUserExists = await redis.exists(`/users/${id}`);
        if (cachedUserExists) {
          const cachedUser = await redis.get(`/users/${id}`);
          return res.json(JSON.parse(cachedUser));
        } else {
          const user = await userData.getUser(id);
          // set user to cache
          await redis.set(`/users/${id}`, JSON.stringify(user));
          res.json(user);
        }
      } catch (e) {
        res.status(422).json({ error: e.message });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  },

  async update(req, res) {
    let id = req.params.id;
    if (id && id.trim().length) {
      try {
        let user = await userData.updateUser(id, req.body);
        await redis.set(`/users/${id}`, JSON.stringify(user));
        return res.json(user);
      } catch (e) {
        console.log(e);
        res.status(422).json({ error: e.message });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  },

  async searchUser(req, res) {
    try {
      const users = await userData.searchUser(req.body);
      res.json(users);
    } catch (e) {
      console.log(e);
      res.status(404).json({ error: "Users not found" });
    }
  },
};
