var models = require("../models/models.js");
var findMatch = [];

exports.userMatch = function(req, res){
	var lastMatch = req.session.lastMatch;
	var today = new Date (Date.now());
	if  (today.getDate() != lastMatch.getDate() && today.getMonth() != lastMatch.getMonth() && today.getFullMonth() != lastMatch.getFullMonth()  ){
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
			debugger
		});
	}
	else {
		debugger
		res.send("you already get a match today")
	}
}
