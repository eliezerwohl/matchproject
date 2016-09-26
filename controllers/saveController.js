var models = require("../models/models.js");
var Sequelize = require('sequelize');
// when  i go to save

// find the match again
// if 3 !=0, 
// 	put that user id there
// 	see which id is larger
// 	if user is larger, change user2vote to true or false
// 		else
// 	user 1

// else {
// 	if current useranswer = false{
// 		change search to false
// 		-1 for everyboyd
// 	}
// 	else if {, 
// 		see if user1 vote = true
// 		if it is, and currentUser also = true
// 			true match()
// }
var matchedId
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
			if (req.body.data=="true"){

				models.Matched.create({
					user1:req.session.matchedArray[0],
					user2:req.session.matchedArray[1],
					yes:1
				}).then(function(results){
					models.Vote.create({
						UserId:req.session.UserId,
						MatchedId:results.dataValues.id,
						vote:req.body.data,
					});
				})
			}
			else{

				models.Matched.create({
				user1:req.session.matchedArray[0],
					user2:req.session.matchedArray[1],
					no:1
				}).then(function(results){
					models.Vote.create({
						UserId:req.session.UserId,
						MatchedId:results.dataValues.id,
						vote:req.body.data,
					})
				})
			}
		}
		else {
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
					}).then(function(data){
						updateAvg(data)
					});
				}
				else {
					models.Matched.update({
						  no: Sequelize.literal('no +1')},
						{where:{
							id:results.dataValues.MatchedId
						}
					}).then(function(modeldata){
						debugger
						updateAvg(modeldata)
					});
				}
			})
		}
	}); 
	// 100/(yes + no) * yes =
	res.send("got it");
}

function updateAvg(data){
	models.Matched.findOne({
		where:{
			id: matchedId
		}
	}).then(function(data){
		debugger
			var avg = Math.round((100/(data.dataValues.yes + data.dataValues.no)) * data.dataValues.yes);
	debugger
	models.Matched.update({
		avg: avg
	},
	{
		where:{
			id:data.dataValues.id
		}
	})

	})


}