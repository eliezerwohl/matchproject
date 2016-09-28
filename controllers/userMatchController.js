var models = require("../models/models.js");
var findMatch = [];

exports.userMatch = function(req, res){
	var lastMatch = new Date(req.session.lastMatch).toDateString();
	var today = new Date (Date.now()).toDateString();
	var createdAt = new Date(req.session.createdAt).toDateString();
	debugger
	if (createdAt === today){
		debugger
		res.send("today")
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
			//currently it's just one pick a day, with the 
			//highest like percentage.  can change later
			var matchId;
			if (data[0].dataValues.user1 == req.session.UserId){
				matchId = data[0].dataValues.user2
			}
			else {
				matchId = data[0].dataValues.user1
			}
			models.Answer.findOne({
				where:{
					UserId:matchId
				},
				attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'UserId'] },
			}).then(function(data){
				debugger
				//needs to update lastmatch to today
				//and update dailymatch
				res.send(data.dataValues)
			})


		});
	}
	else {
		//gets match for the day
		debugger
		res.send("none")
	}
}

//make a daily match put it on user
