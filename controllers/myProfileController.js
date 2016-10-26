var models = require("../models/models.js");
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
    if (req.session.tempGreeting == false){res.send("greeting");}
    else{res.send("myInfo");}
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
    res.send("myQuestions")
    if (req.session.tempGreeting == false){
       models.User.update({
        match:1
        },{where:{id:req.session.UserId}
      });
    }
  });
}

exports.currentStatus = function(req, res){
  models.User.findOne({attributes: ['match'] ,where: {id : req.session.UserId}})
  .then(function(data){
   res.send(data.dataValues.match);
   req.session.currentStatus = data.dataValues.match;
   req.session.save()
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
exports.myInfo = function (req, res) {
  models.User.find({attributes: { exclude: ['createdAt', 'updatedAt', 'id'] },where: {id : req.session.UserId}})
  .then(function(result){
    if (!result.dataValues.age){
      res.send("blank")
    }else{
      models.Answer.find({attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'UserId'] },
        where: {UserId : req.session.UserId}}).then(function(data){
        var obj = Object.assign(result.dataValues, data.dataValues);
        res.send(obj);
      });
    }
  });
}