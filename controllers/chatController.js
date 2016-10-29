var session = require('express-session');
var models = require("../models/models.js");
var Sequelize = require('sequelize');

exports.findChat =function(req, res){
	//not saving to req.session
	var chatIds = [];
	models.Matched.findAll({
		where:{chat:1,
			$or: {
		    user1:req.session.UserId,
		    user2: req.session.UserId,}},
		include: [{model: models.Message,
	      where: { MessageId: Sequelize.col('Message.id') }
	    }],
	}).then(function(data){
		req.session.matchData = data
		//seperates the other person's id s from matches
		for (var i = 0; i < data.length; i++) {
			if(data[i].dataValues.user1 === req.session.UserId){
				chatIds.push(data[i].dataValues.user2);}
			else{chatIds.push(data[i].dataValues.user1);}}
		models.User.findAll({
			where:{id:{$in:chatIds}}
		}).then(function(user){
			req.session.chatArray = [];
			matchData = req.session.matchData 
			for (i = 0; i < user.length; i++) {
			//first one loops over the user data 
    		for (j = 0; j < req.session.matchData.length; j++) { 
    			//second one loops over matchdata
    		var userRole;
    		//check to make sure combining the arrays correctly
    		if (user[i].dataValues.id == matchData[j].dataValues.user1 
    			|| user[i].dataValues.id == matchData[j].dataValues.user2){
   				if(matchData[j].dataValues.Message.dataValues.UserId == req.session.UserId){userRole = "user";}
					else{userRole="other"}
						req.session.chatArray.push({updateId:matchData[j].dataValues.id, 
							checked: matchData[j].dataValues.Message.dataValues.checked,
							msg:matchData[j].dataValues.Message.dataValues.message, 
							lastname:user[i].dataValues.lastname, user:userRole, 
							id:user[i].dataValues.uuid ,firstname:user[i].dataValues.firstname});	
	        	matchData.splice(j, j+1)
		        break
      }}}
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
				dataArray.push({user:"user", message:data[i].dataValues.message});}
			else {dataArray.push({user:"other", message:data[i].dataValues.message});}
		}
		res.send(dataArray);
	});
}

exports.chatName = function(req, res){
	models.User.findOne({
		where:{uuid:req.session.MatchUuid},
		attributes:["firstname", "lastname", "uuid", "id"]
	}).then(function(data){
		req.session.otherChat = data.dataValues.id;
		//can't send id back
		res.send(data);
	})
}
exports.chatId = function(req, res){
	req.session.MatchUuid = req.body.uuid;
	req.session.chatId = req.body.match;
	res.send("okay");
}

exports.save = function(msg, socket, room){
	debugger
	//change data type
	var checked 
	if (room < 2){checked = 0}
	else{checked = 1}
	models.Message.create({
		message:msg,
		UserId:socket.handshake.session.UserId,
		MatchedId:socket.handshake.session.chatId,
		reciveId:socket.handshake.session.MatchUuid,
		checked:checked,
	}).then(function(data){
		models.Matched.update({
			MessageId:data.dataValues.id
		},{
			where:{id:socket.handshake.session.chatId}
		});
	});
}