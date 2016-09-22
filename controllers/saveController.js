var models = require("../models/models.js");

exports.saveMatch = function(req, res){
	debugger
	console.log(req.body)
	models.Matched.findOne({
		where:{
			user1:{$in:req.session.matchedArray} ,
			user2:{$in:req.session.matchedArray} ,
		}
	}).then(function(data){
		debugger
		if (data == null){
			models.Matched.create({
				user1:req.session.matchedArray[0],
			user2:req.session.matchedArray[1],
			}).then(function(results){
				models.Vote
			})

		}
		else {
			models.Vote.Create({
				UserId:req.session.UserId;
				MatchId:data.dataValues.id;
				vote:req.body.data;
			})
		}
	})
	res.send("got it");
}