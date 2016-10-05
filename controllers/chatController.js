var session = require('express-session');
var models = require("../models/models.js");

exports.findChat =function(req, res){
	chatIds = [];
	models.Matched.findAll({
		where:{
			chat:1,
			$or: {
		    user1:req.session.UserId,
		    user2: req.session.UserId,
			}
		}
	}).then(function(data){
		for (var i = 0; i < data.length; i++) {
			if(data[i].dataValues.user1 === req.session.UserId){
				chatIds.push(data[i].dataValues.user2)
			}
			else{chatIds.push(data[i].dataValues.user1)}
		}
		models.User.findAll({
			where:{
						id:{$in:chatIds}
					}
		}).then(function(data){
			//putting it in array so user can send back the i of the array, without
			//knowing the other users id
			req.session.chatArray = [];
			for (var i = 0; i < data.length; i++) {
				thisArray.push({arrayId:i, firstname:data[i].dataValues.firstname})
			}
			res.send(req.session.chatArray)
		});
	});
}

exports.save = function(msg, socket){
	console.log(socket.handshake.session.UserId)
	console.log(msg)
}