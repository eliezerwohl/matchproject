var models = require("../models/models.js");
var Sequelize = require('sequelize');

exports.saveMatch = function(req, res){

	models.MatchData.findOne({
		where:{UserId:req.session.UserId}
	}).then(function(data){
	var currentPrime = 	JSON.parse(data.currentPrime)
		var matchedArray = [currentPrime.id, data.matchId]
		debugger
	
		var matchedId
	//lower user id will always be user 1
	matchedArray.sort(function(a, b){return a-b});
	models.Matched.findOne({
		where:{
			user1:{$in:matchedArray},
			user2:{$in:matchedArray},
		}
	}).then(function(data){
		if (data == null){
			//that means this is the first person voting for this match
			if (req.body.data=="true"){
				models.Matched.create({
					user1:matchedArray[0],
					user2:matchedArray[1],
					yes:1, 
					MessageId:1
				}).then(function(results){
					models.Vote.create({
						UserId:req.session.UserId,
						MatchedId:results.dataValues.id,
						vote:req.body.data,
					});
				});
			}
			else {
				models.Matched.create({
				user1:matchedArray[0],
					user2:matchedArray[1],
					no:1,
					MessageId:1
				}).then(function(results){
					models.Vote.create({
						UserId:req.session.UserId,
						MatchedId:results.dataValues.id,
						vote:req.body.data,
					});
				});
			}
		}
		else {
			//it's been matched before
			matchedId = data.dataValues.id;
			models.Vote.create({
				UserId:req.session.UserId,
				MatchedId:data.dataValues.id,
				vote:req.body.data,
			}).then(function(results){
				if (req.body.data=="true"){
					models.Matched.update({
						  yes: Sequelize.literal('yes +1')},
						{where:{
							id:results.dataValues.MatchedId
						}
					}).then(function(){updateAvg(matchedId);});
				}
				else {
					models.Matched.update({
						  no: Sequelize.literal('no +1')},
						{where:{id:results.dataValues.MatchedId}
					}).then(function(){updateAvg(matchedId);});
				}
			});
		}
	}); 
	res.send("got it");	


	})
	
}

function updateAvg(matchedId){
	models.Matched.findOne({
		where:{id: matchedId}
	}).then(function(data){
		var avg = Math.round((100/(data.dataValues.yes + data.dataValues.no)) * data.dataValues.yes);
		models.Matched.update({avg: avg},
		{where:{id:data.dataValues.id}
		});
	});
}