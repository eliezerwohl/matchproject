var models = require("../models/models.js");
var findMatch = [];

exports.userMatch = function(req, res){
	var lastMatch = new Date(req.session.lastMatch).toDateString();
	var today = new Date (Date.now()).toDateString();
	var createdAt = new Date(req.session.createdAt).toDateString();
	debugger
	if (createdAt === lastMatch){
		debugger
		res.send("today")
	} 
	else if  (today != lastMatch){
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
	    ]
		}).then(function(data){
			res.send("new match")
		});
	}
	else {
		debugger
		res.send("you already get a match today")
	}
}
