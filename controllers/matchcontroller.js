var models = require("../models/models.js");

exports.myQuestions = function(req, res){
var userId = req.user.id;
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
      models.Answer.update(
      {
      a091201: req.body.a091201,
      a091202:req.body.a091202,
      a091203:req.body.a091203,
      a091204:req.body.a091204,
    },
    {
      where: { UserId : req.session.UserId }
    })
    .then(function (result) { 
        res.send("good");
    });
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