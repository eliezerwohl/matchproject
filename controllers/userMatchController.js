var models = require("../models/models.js");
var Sequelize = require('sequelize');

exports.userMatch = function(req, res){
	var matchId;
	models.User.findOne({
		where:{id:req.session.UserId}
	}).then(function(data){
		var lastMatch = new Date(data.dataValues.lastMatch).toDateString();
		var createdAt = new Date(data.dataValues.createdAt).toDateString()
		var today = new Date (Date.now()).toDateString();
		var dailyMatch = data.dataValues.dailyMatch;
		if (dailyMatch === 0 &&  today == lastMatch){
			res.send("done");
			//already did the one match a day
		} 
		else if  (today != lastMatch){
			//gets a new match
			models.Matched.findAll({
				where: {
					//unless both ppl answer this should stay as OK
					search:"OK",
					//if the user responds, this will prevent this match from coming up again
					answered:{$notIn:[req.session.UserId]},
			    $or: {
			      user1:req.session.UserId,
			      user2: req.session.UserId,
			    },
		    },
		    order: [
		    // Will escape username and validate DESC against a list of valid direction parameters
		    ['avg', 'DESC'],
		    ],
			}).then(function(data){
				if (data.length == 0){
					//if there are not matches
					res.send("sorry")
				}
				else {
					//currently it's just one pick a day, with the 
					//highest like percentage.  can change later
					if (data[0].dataValues.user1 == req.session.UserId){
						matchId = data[0].dataValues.user2
					}
					else {matchId = data[0].dataValues.user1}
					//will prevent if the day changes while the user is logged in
					//everything goes smoothly 
					req.session.dailyMatch = matchId;

					models.Answer.findOne({
						where:{
							UserId:matchId
						},
						attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'UserId'] },
					}).then(function(data){
						res.send(data.dataValues)
						models.User.update({
							lastMatch:Date.now(),
							dailyMatch:matchId
							},
							{where:{id:req.session.UserId}
						});
					});
				}
			});
		}
		else {
			//gets match for the day which was already calculated 
			models.Answer.findOne({
				where:{UserId:dailyMatch},
				attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'UserId'] },
			}).then(function(data){
				res.send(data.dataValues);
			});
		}
	});
}

