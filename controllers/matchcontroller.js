var models = require("../models/models.js");

exports.myQuestions = function(req,res){


models.Answer.update(
  {
    city: req.body.city,
  	upper:req.body.upper
  	lower:req.body.lower
  	seeking:req.body.seeking,
  	gender:req.body.gender
  },
  {
    where: { UserId : req.user.id }
  })
  .then(function (result) { 
  	debugger
  	res.send("good")

  }, function(rejectedPromiseError){
  	debugger
  	res.send("bad")
  });

}