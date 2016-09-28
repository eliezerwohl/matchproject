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