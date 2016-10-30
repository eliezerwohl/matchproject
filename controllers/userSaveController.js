var models = require("../models/models.js");
var Sequelize = require('sequelize');
if (process.env.NODE_ENV === 'production') {
  var connection = new Sequelize('mysql://b1e734d72f7481:840b5f35@us-cdbr-iron-east-04.cleardb.net/heroku_75496f89e747476?reconnect=true');}
  else {var password = require("../ignore/ignore.js");var connection = new Sequelize('match', 'root', password.password); }

exports.userSave = function(req, res) {
	res.send("saved")
  if (req.session.dailyMatch < req.session.UserId) {
    saveUpdate(req, req.session.dailyMatch, req.session.UserId, "user1Vote", "user2Vote");
  }
  else {saveUpdate(req, req.session.UserId, req.session.dailyMatch, "user2Vote", "user1Vote");} 
}

function saveUpdate(req, id1, id2, vote, thisVar){
  var matchedId;  var user1Vote;var user2Vote;
  connection.query("UPDATE `Matcheds` SET `"+ thisVar + "`='1',`updatedAt`= NOW() WHERE `user1` = " + id1 + " AND `user2` = " +id2 +" ")
  .then(function(data) {
    models.Matched.findOne({
      where: {user1: id1, user2: id2}
    }).then(function(data) {
      dailyMatchFunction(req)
        matchedId = data.dataValues.id;
      if (data.dataValues[vote] == null) {
        //both haven't voted 
        models.Matched.update({
          answered: req.session.UserId
        }, {
          where: {id: data.dataValues.id}
        })
      } else {
        user1Vote = data.dataValues.user1Vote;
       user2Vote = data.dataValues.user2Vote;
       //both have voted
        models.Vote.findAll({
          where: {MatchedId: matchedId}
        }).then(function(data) {
          scoring(data, matchedId, user1Vote, user2Vote, req);
        });
      }
    });
  });
}

function dailyMatchFunction(req) {
  models.User.update({
		dailyMatch:0},
		{where:{id:req.session.UserId}
	});
}

function scoring (data, matchedId, user1Vote, user2Vote, req){
  models.NotifyConnect.create({
    UserId:req.session.dailyMatch,
    MatchedId:matchedId,
  }).then(function(data){
    models.NotifyConnect.create({
    UserId:req.session.UserId,
    MatchedId:matchedId,
    });
  });
	var trueArray = [];
	var falseArray = [];
	if (user1Vote == user2Vote) {
  	for (var i = 0; i < data.length; i++) {
  		if(data[i].dataValues.vote === true){
  			trueArray.push(data[i].dataValues.UserId)
  		}
  		else{falseArray.push(data[i].dataValues.UserId);}
  	}
    if (user1Vote == true) {
    	models.Matched.update({
    		chat:true,
        MessageId:1,
    		search:"none"},
        {where:{id:matchedId}
    	});
      userScore ("+5", "-1", trueArray, falseArray);
    } else {
    	models.Matched.update({
    		search:"none"},
        {where:{id:matchedId}
    	});
    	userScore("-1", "+5", trueArray, falseArray);
    }
	} 
}

function userScore(trueScore, falseScore, trueArray, falseArray){
  models.User.update({
    score: Sequelize.literal('score ' + trueScore)},
    {where:{id:{$in:trueArray}}
  }).then(function(data){
    models.User.update({
      score: Sequelize.literal('score ' + falseScore)},
      {where:{id:{$in:falseArray}}
    });
  });
}