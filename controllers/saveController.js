var models = require("../models/models.js");

exports.saveMatch = function(req, res){
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
				models.Vote.create({
				UserId:req.session.UserId,
				MatchedId:results.dataValues.id,
				vote:req.body.data,
			})
		})

		}
		else {
			models.Vote.create({
				UserId:req.session.UserId,
				MatchedId:data.dataValues.id,
				vote:req.body.data,
			}).then(function(data){

			})
		}
	})
	res.send("got it");
}