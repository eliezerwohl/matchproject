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
		},
		include: [{
	    model: models.Message,
	        where: { MessageId: Sequelize.col('Message.id') }
	    }],
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
				var user;
				if(req.session.matchData[i].dataValues.Message.dataValues.UserId == req.session.UserId){
						user = "user"
					}
				else{user="other"}
					debugger
				req.session.chatArray.push({arrayId:i, updateId:req.session.matchData[i].dataValues.id, checked: req.session.matchData[i].dataValues.Message.dataValues.checked,msg:req.session.matchData[i].dataValues.Message.dataValues.message, lastname:data[i].dataValues.lastname, user:user, firstname:data[i].dataValues.firstname});
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
		res.send(dataArray)
	})
}

exports.chatName = function(req, res){
		res.send(req.session.match)
}
exports.chatId = function(req, res){
	req.session.chatId = req.session.matchData[req.body.data].id;
	if (req.session.matchData[req.body.data].user1 === req.session.UserId){
		req.session.otherChat = req.session.matchData[req.body.data].user2
	}
	else{
		req.session.otherChat = req.session.matchData[req.body.data].user1
	}
	req.session.match = req.session.chatArray[req.body.data]
	res.send("done");
}

exports.save = function(msg, socket, room){
	var checked 
	if (room < 2){
		checked = 0
	}
	else{
		checked = 1
	}
	models.Message.create({
		message:msg,
		UserId:socket.handshake.session.UserId,
		MatchedId:socket.handshake.session.chatId,
		reciveId:socket.handshake.session.otherChat,
		checked:checked,
	}).then(function(data){
		models.Matched.update({
			MessageId:data.dataValues.id
		},{
			where:{
				id:socket.handshake.session.chatId
			}
		});
	});
}