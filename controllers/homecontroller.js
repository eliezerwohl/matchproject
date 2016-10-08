var models = require("../models/models.js");
var bcrypt = require("bcryptjs");

function saltyhash(pass) {
  var salt = bcrypt.genSaltSync(10);
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
          account:req.body.account.toLowerCase(),
        }).then(function(data) {
          var tempId = data.dataValues.id;
            models.Answer.create({
              UserId:data.dataValues.id,
            });
          res.redirect("/?msg=Thanks for registering, please login.");
        });
      }
    });
  }

exports.loggedin = function (req, res){
   models.User.findOne({
    where: [{
      email: req.user.username
    }]
  }).then(function(User) {
    req.session.UserId = User.dataValues.id;
    req.session.account  = User.dataValues.account;
    req.session.greeting = User.dataValues.greeting

    if (req.session.greeting == false ){
      res.render("greeting")
      models.User.update({
        greeting:1
        },{where:{id:req.session.UserId}
      });
    }
    else{
       res.render("home");
    }
  });
}

