var models = require("../models/models.js");

exports.saveMatch = function(req, res){
	debugger
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
				debugger
			})

		}
		else {


		}
	})
	res.send("got it");

	// first check the matched

	// if nothing
	// 	then put it in
	// else
	// 	find the vote of the two
	// 	add them in
}