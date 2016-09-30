var models = require("../models/models.js");
exports.userSave = function(req, res){
	debugger
	if (req.session.dailyMatch < req.session.UserId){
		models.Matched.update({
			user1Vote:req.body.data
			},
			{where:{user1:req.session.dailyMatch, user2:req.session.UserId}
		}).then(function(data, option){
			debugger
					models.Matched.findOne({
						where:{user1:req.session.dailyMatch, user2:req.session.UserId}
					}).then(function(data){
						//grab the user 2 datat here
						//grab the id of the match here
						var voteId
						if (data.dataValues.user1Vote === null ){
								models.Matched.update({
									answered:req.session.UserId
								},
								{
								where:{id:data.dataValues.id}
								})
						}
						else{
							models.Matched.update({
									search:"None"
								},
								{
								where:{id:data.dataValues.id}
								}).then(function(data){
									models.Vote.findAll({
										where:{
											id:voteId
										}
									}).then(function(data){
										if (user1.vote === user.vote){
											//update scores correcly
										}
										else{
											nothing
										}
										//update all their scores 
									})
								})


						}
					})
		})
	}
	else {
		models.Matched.update({
			user2Vote:req.body.data
			},
			{where:{user2:req.session.dailyMatch, user1:req.session.UserId}
		}).then(function(data, option){
			debugger
		})
	}
	console.log("hit it")
}



if one equls null or other equals null
	update  answered:req.session.UserId
else{
	update 
}

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