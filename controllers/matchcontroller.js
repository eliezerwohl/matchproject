var models = require("../models/models.js");

exports.myQuestions = function(req, res){
var userId = req.user.id;
debugger
models.Filter.update(
  {
    city: req.body.city,
  	upper:req.body.upper,
  	lower:req.body.lower,
  	seeking:req.body.seeking,
  	gender:req.body.gender
  },
  {
    where: { UserId : req.session.UserId }
  })
  .then(function (result) { 
  	res.send("good");
  }, function(rejectedPromiseError){
  	res.send("bad");
  });

}

exports.myInfo = function (req, res) {
  models.Filter.find({where: {UserId : req.session.UserId}}).then(function(result){
    models.Answer.find({where: {UserId : req.session.UserId}}).then(function(data){
      var obj = Object.assign(result.dataValues, data.dataValues);
      res.send(obj);
    });
  });
}