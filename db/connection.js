var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/project4");

var Note = mongoose.Schema({
  text: String
});

var Medname = mongoose.Schema({
  text: String,
  note: [Note],
  photo_url: String
})

var Meds = mongoose.Schema({
  medname: [Medname]
});

var Users = mongoose.Schema({
  name: String,
  meds: Array
})

mongoose.model("Note", Note);
mongoose.model("Medname", Medname);
mongoose.model("Meds", Meds);
mongoose.model("Users", Users);

module.exports = mongoose;
