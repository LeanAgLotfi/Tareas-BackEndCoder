const mongoose = require('mongoose')
const options = require('./options')
const { logCyan, logRed } = require('../utils/console')

mongoose.set("strictQuery", false);
mongoose.connect(options.mongoDB.url)
  .then(() => {
    logCyan("Conected to Mongo DB successfully!");
  })
  .catch((error) => {
    logRed("There was an error connecting to DB");
    console.error(error.message);
  })