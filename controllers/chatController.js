var session = require('express-session');
var models = require("../models/models.js");
var Sequelize = require('sequelize');

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
		req.session.matchData = data
		for (var i = 0; i < data.length; i++) {
			if(data[i].dataValues.user1 === req.session.UserId){
				chatIds.push(data[i].dataValues.user2);
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
				req.session.chatArray.push({arrayId:i, firstname:data[i].dataValues.firstname});
			}
			res.send(req.session.chatArray);
		});
	});
}

exports.chatHistory = function(req, res){
	models.Message.findAll({
		//go back and limit the returned data
		where:{
			MatchedId:req.session.chatId
		},
		attributes: { include: ['message', 'UserId'] },
	}).then(function(data){
		dataArray = [];
		for (var i = 0; i < data.length; i++) {
			if (data[i].dataValues.UserId == req.session.UserId){
				dataArray.push({user:"user", message:data[i].dataValues.message})
			}
			else {
				dataArray.push({user:"other", message:data[i].dataValues.message})
			}
		}
		//put a function here than take the id and turn it into either "me" or "them" 
		res.send(dataArray)
	})
}

exports.chatName = function(req, res){
	var otherId;

	if (req.session.match.user1 == req.session.UserId){
		otherId = req.session.match.user2
	}
	else{
		otherId = req.session.match.user1
	}
	models.User.findOne({
		where:{id:otherId},
		//limit to first and last name
		attributes: { include: ['firstname', 'lastname'] },
	}).then(function(data){
		debugger
		res.send(data)
	})
}
exports.chatId = function(req, res){
	req.session.chatId = req.session.matchData[req.body.data].id;
	req.session.match = req.session.matchData[req.body.data]
	res.send("done");

}

exports.save = function(msg, socket){
	models.Message.create({
		message:msg,
		UserId:socket.handshake.session.UserId,
		MatchedId:socket.handshake.session.chatId
	})
}