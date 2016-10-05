var session = require('express-session');
var models = require("../models/models.js");

exports.findChat =function(req, res){
	models.Matched.findAll({
		where:{
			chat:1,
			$or: {
			      user1:req.session.UserId,
			      user2: req.session.UserId,
			    }
		}

	}).then(function(data){
		debugger
	})
}

exports.save = function(msg, socket){
	debugger
	console.log(socket.handshake.session.UserId)
	console.log(msg)
}