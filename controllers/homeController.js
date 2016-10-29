var models = require("../models/models.js");
var bcrypt = require("bcryptjs");

function saltyhash(pass) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(pass, salt);
  return hash;
}
exports.signUp = function(req, res){
  models.User.findOne({
      where: {email: req.body.email}
    }).then(function(results) {
      if (results) {res.redirect("/signup?taken");} 
      else {
        models.User.create({
          lastname: (req.body.lastname).trim(),
          firstname:  (req.body.firstname).trim(),
          email: req.body.email,
          password: saltyhash(req.body.password),
        }).then(function(data) {
          models.MatchData.create({
            UserId: data.dataValues.id,
          })
          models.Online.create({
             user:data.dataValues.uuid,
          });
            models.Answer.create({UserId:data.dataValues.id});
          res.redirect("/?success")
        });
      }
    });
  }
exports.loginData = function(req, res){
  //if score is 0, wont' cause an error this way
  var data={match:req.session.match}
  res.send(data)
}
exports.loggedin = function (req, res){
   models.User.findOne({
    where: [{email: req.user.username}]
  }).then(function(User) {
    // req.session.score = User.dataValues.score;
    req.session.match = User.dataValues.match;
    req.session.UserId = User.dataValues.id;
    req.session.uuid = User.dataValues.uuid;
    // req.session.greeting = User.dataValues.greeting

    res.render("home");
  });
}

exports.homecheck = function(req, res){
  if (req.session.greeting == false){
     models.User.update({
        greeting:1
        },{where:{id:req.session.UserId}
      });
     res.send("greeting");
  }
  else{res.send("false");}
}
