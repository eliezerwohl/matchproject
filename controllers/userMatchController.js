var models = require("../models/models.js");
var findMatch = [];

exports.userMatch = function(req, res){
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

	})
}
