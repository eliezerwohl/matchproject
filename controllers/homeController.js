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
        function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
         });
        return uuid;
        };
        models.User.create({
          uuid:generateUUID(),
          lastname: (req.body.lastName).trim(),
          firstname:  (req.body.firstName).trim(),
          email: req.body.email,
          password: saltyhash(req.body.password),
        }).then(function(data) {
          var tempId = data.dataValues.id;
          models.Online.create({
             user:data.dataValues.uuid,
          })
            models.Answer.create({
              UserId:data.dataValues.id,
            })
          res.redirect("/?msg=Thanks for registering, please login.");
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
    where: [{
      email: req.user.username
    }]
  }).then(function(User) {
    req.session.score = User.dataValues.score;
    req.session.match = User.dataValues.match;
    req.session.UserId = User.dataValues.id;
    req.session.uuid = User.dataValues.uuid;
    req.session.account  = User.dataValues.account;
    var greeting = User.dataValues.greeting
    req.session.save()

    if (greeting == false ){
      res.render("greeting")
      req.session.tempGreeting = false
      req.session.save()
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
