var mongoose = require("./connection");
var seed_data = require("./med_seeds");
var user_data = require("./user_seeds")

var Meds = mongoose.model("Meds");
var Users = mongoose.model("Users");

Meds.remove(). then(function(){
  Meds.collection.insert(seed_data).then(function(){
    process.exit();
  });
});

Users.remove(). then(function(){
  Users.collection.insert(user_data).then(function(){
    process.exit();
  });
});
