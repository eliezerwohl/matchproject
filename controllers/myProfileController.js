var models = require("../models/models.js");
var Sequelize = require('sequelize');

exports.myInfoUpdate = function(req, res){
  models.User.update({
    city: req.body.city,
    upper:req.body.upper,
    lower:req.body.lower,
    seeking:req.body.seeking,
    gender:req.body.gender,
    age:req.body.age
  },{where: { id : req.session.UserId }
  }).then(function(results){
    if (req.session.greeting == false){res.redirect("/myQuestions");}
    else{res.redirect("/myprofile");}
  });
}

exports.myQuestions = function(req, res){
  models.Answer.update({
      q01: req.body.q01,
      q02: req.body.q02,
      q03: req.body.q03,
      q04: req.body.q04,
      q05: req.body.q05,
      q06: req.body.q06,
      q07: req.body.q07,
      q08: req.body.q08,
      q09: req.body.q09,
    },{where: { UserId : req.session.UserId }
  }).then(function (result) { 
    if (req.session.greeting == false){res.redirect("/settings");}
     else{res.redirect("/myProfile");}
  });
}

exports.currentStatus = function(req, res){
  models.User.findOne({attributes: ['match', 'age'],
    where: {id : req.session.UserId},
      include: [{
      model: models.Answer,
        where: { UserId: Sequelize.col('User.id') },
        attributes: ["q01"],
      }],
  })
  .then(function(data){
    if ((!data.dataValues.age) || (!data.dataValues.Answers[0].dataValues.q01)  ){
      res.send("incomplete")
    }
    else {
      res.send(data.dataValues.match);
      req.session.currentStatus = data.dataValues.match;
    }
  });
}

exports.updateStatus = function(req, res){
  if (req.session.currentStatus == true){req.session.currentStatus = false}
  else{req.session.currentStatus = true}
  models.User.update({match:req.session.currentStatus}, {where: {id : req.session.UserId}})
  .then(function(data){
    res.send(req.session.currentStatus)
  }); 
}

exports.myQuestionsData = function(req, res){
  models.Answer.find({attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'UserId'] },
    where: {UserId : req.session.UserId}}).then(function(data){
      res.send(data.dataValues);
  });
}
exports.myInfo = function (req, res) {
  models.User.find({attributes: { exclude: ['createdAt', 'updatedAt', 'id'] },
    where: {id : req.session.UserId}})
  .then(function(data){
    if (!data.dataValues.age){
      res.send("blank")
    }else{
      res.send(data.dataValues);
    }
  });
}