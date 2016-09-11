var models = require("../models/models.js");
var bcrypt = require("bcryptjs");


function saltyhash(pass) {
  var salt = bcrypt.genSaltSync(10);
  console.log(salt);
  var hash = bcrypt.hashSync(pass, salt);
  return hash;
}
exports.signUp = function(req, res){
  models.User.findOne({
      where: {
        email: req.body.email
      }
    }).then(function(results) {
      if (results) {
        res.redirect("/adminCreate?msg=Your email is already registered, please login.");
      } else {
        models.User.create({
          lastname: (req.body.lastName).trim(),
          firstname:  (req.body.firstName).trim(),
          email: req.body.email,
          password: saltyhash(req.body.password),
          account:req.body.account,
        }).then(function() {
          res.send("data baby")
        });
      }
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
