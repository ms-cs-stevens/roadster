const mongoose = require('mongoose');
// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Connect to our Database and handle any bad connections // move to another file later
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// making sure mongo is working
mongoose.connection.once('open', () => {
  console.log('Mongo is running');
});

mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// READY?! Let's go!

// import all of our models
// require('./models/Publication');

// Start our app!
const app = require('./app');

app.set('port', process.env.PORT || 4000);
app.set('host', process.env.HOST || '0.0.0.0');

const server = app.listen(app.get('port'), app.get('host'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
