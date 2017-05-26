var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  google : {
    id : String,
    token : String,
    email : String,
    name : String
  },
  played : [{type : String}]
});

module.exports = mongoose.model('User',userSchema);
