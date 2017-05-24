var mongoose = require('mongoose');

var placeSchema = mongoose.Schema({
  name : String,
  startLetter : String
});

module.exports = mongoose.model('Place',placeSchema);
