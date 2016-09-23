var models = require("../models/models.js");


exports.userMatch = function(req, res){
	models.Matched.findAll({
		where: {
		
    $or: {
    		user1:2,
     user2: 2,
    }
  }
	}).then(function(data){
		debugger
	})
}
