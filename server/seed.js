const mongoose = require("mongoose");
// import environmental variables from our variables.env file
require("dotenv").config({ path: "variables.env" });

// Connect to our Database and handle any bad connections // move to another file later
mongoose.connect(
  process.env.DATABASE,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    // drop old db if already present
    mongoose.connection.db.dropDatabase();
  }
);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on("error", (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// READY?! Let's go!
const { Journey, User } = require("./models");
const { journeys, users } = require("./dump");

async function createJourneys() {
  const createdJourneys = await Journey.create(journeys);
  console.log(`${createdJourneys.length} journeys created.`);
}

async function createUsers() {
  let createdUsers = await User.create(users);
  console.log(`${createdUsers.length} users created.`);
}

async function dumpDatabase() {
  // create new db and new collections with data
  await createJourneys();
  await createUsers();
  process.exit();
}

dumpDatabase();
