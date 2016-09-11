var models = require("../models/models.js");
exports.homeController = function(req, res){
	 models.User.create({
   firstname:"John"
  }).then(function(data) {
  	debugger
    res.send("back")
  });
}


exports.register = function (req, res){
  models.User.findOne({
    where: {
      email: req.body.email
    }
  }).then(function(results) {
    if (results) {
      res.redirect("/register?msg=Your email is already registered, please login.");
    } else {
      models.User.create({
        lastname: (req.body.lastname).trim(),
        firstname:  (req.body.firstname).trim(),
        email: req.body.email,
        // password: saltyhash(req.body.password),
        password: req.body.password,
      }).then(function() {
        res.redirect("/?msg=Thanks for registering, please login.");
      });
    }
  });
}
