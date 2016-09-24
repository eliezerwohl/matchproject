var models = require("../models/models.js");




when  i go to save

find the match again
if answered !=0, 
	put that user id there
	see which id is larger
	if user is larger, change user2vote to true or false
		else
	user 1

else {
	if current useranswer = false{
		change search to false
		-1 for everyboyd
	}
	else if {, 
		see if user1 vote = true
		if it is, and currentUser also = true
			true match()
}

exports.saveMatch = function(req, res){
	//lower user id will always be user 1
	req.session.matchedArray.sort();
	models.Matched.findOne({
		where:{
			user1:{$in:req.session.matchedArray} ,
			user2:{$in:req.session.matchedArray} ,
		}
	}).then(function(data){
		if (data == null){
			models.Matched.create({
			user1:req.session.matchedArray[0],
			user2:req.session.matchedArray[1],
			}).then(function(results){
				models.Vote.create({
				UserId:req.session.UserId,
				MatchedId:results.dataValues.id,
				vote:req.body.data,
				});
			});
		}
		else {
			models.Vote.create({
				UserId:req.session.UserId,
				MatchedId:data.dataValues.id,
				vote:req.body.data,
			}).then(function(data){

			})
		}
	});
	res.send("got it");
}