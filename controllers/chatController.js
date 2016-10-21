var session = require('express-session');
var models = require("../models/models.js");
var Sequelize = require('sequelize');

exports.findchat = function(socket, io){
	socket.handshake.session.chatIds = [];
	function callback2(data){
		socket.chatArray = data;
	}
	models.Matched.findAll({
		where:{
			chat:1,
			$or: {
		    user1:socket.handshake.session.UserId,
		    user2: socket.handshake.session.UserId,
			}
		},
		include: [{
	    model: models.Message,
	        where: { MessageId: Sequelize.col('Message.id') }
	    }],
	}).then(function(data){
		function callback(data){
						callback2(data)
					}
		socket.handshake.session.matchData = data
		for (var i = 0; i < data.length; i++) {
			if(data[i].dataValues.user1 === socket.handshake.session.UserId){
				socket.handshake.session.chatIds.push(data[i].dataValues.user2);
			}
			else{socket.handshake.session.chatIds.push(data[i].dataValues.user1)}
		}
		socket.handshake.session.save()
		models.User.findAll({
			where:{
						id:{$in:socket.handshake.session.chatIds}
					}
					
		}).then(function(data){
			//putting it in array so user can send back the i of the array, without
			//knowing the other users id
			socket.handshake.session.chatArray = [];
			for (var i = 0; i < data.length; i++) {
				var user;
				if(socket.handshake.session.matchData[i].dataValues.Message.dataValues.UserId == socket.handshake.session.UserId){
						user = "user"
					}
				else{user="other"}
				socket.handshake.session.chatArray.push({arrayId:i, updateId:socket.handshake.session.matchData[i].dataValues.id, checked: socket.handshake.session.matchData[i].dataValues.Message.dataValues.checked,msg:socket.handshake.session.matchData[i].dataValues.Message.dataValues.message, lastname:data[i].dataValues.lastname, user:user, firstname:data[i].dataValues.firstname});
			}
		
			callback(socket.handshake.session.chatArray)
			io.to(socket.id).emit("foundChat", socket.handshake.session.chatArray);
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

exports.chatName = function(socket, io){
	debugger
		io.to(socket.id).emit("chatNameDone", socket.handshake.session.match)
}
exports.chatId = function(socket, io, data){
	//not saving here for some reason
	socket.handshake.session.chatId = socket.handshake.session.matchData[data].id;
	if (socket.handshake.session.matchData[data].user1 === socket.handshake.session.UserId){
		socket.handshake.session.otherChat = socket.handshake.session.matchData[data].user2
	}
	else{
		socket.handshake.session.otherChat = socket.handshake.session.matchData[data].user1
	}
	socket["testing"] = socket.chatArray[data]
	io.to(socket.id).emit("chatIdDone", "computer world");
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