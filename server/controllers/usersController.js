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
    if (!id) {
      res.json({ error: "Requested page is not found" });
    }
    try {
      // get cached user
      console.log(req.url);
      const cachedUserExists = await redis.exists(req.url);
      if (cachedUserExists) {
        const cachedUser = await redis.hgetall(req.url);
        return res.json(cachedUser);
      } else {
        const user = await userData.getUser(id);
        // set user to cache
        await redis.hmset(req.url, user);
        console.log(user);
        res.json(user);
      }
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  },
};
