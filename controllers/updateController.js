var models = require("../models/models.js");
function callback(name, data, socket){socket[name] = data}

exports.score = function(socket, io) {
  function score() {
    models.User.findOne({
      where:{id:socket.handshake.session.UserId}
    }).then(function(data){
      //error msg Cannot read property 'dataValues' of null
      if (data.dataValues.score != socket.score){
        callback("score", data.dataValues.score, socket);
        io.to(socket.id).emit('score', data.dataValues.score);}
    });     
  }
  score();

}

exports.notifyConnect = function(socket, io){
  function notify(){
  models.NotifyConnect.findAll({
    where:{UserId:socket.handshake.session.UserId}
  }).then(function(data){
     if (data.length != socket.notify){
          callback("notify", notify, socket);
        io.to(socket.id).emit('notify', data.length);}
    });
  }
  notify();
}

exports.checkedNotify = function(socket, io){
  models.NotifyConnect.destroy({
    where:{UserId:socket.handshake.session.uuid}
  });
}

exports.newMessage = function(socket, io, location){
  function newMessage(){
    models.Message.findAndCountAll({
      where:{
        reciveId:socket.handshake.session.uuid,checked:0}
    }).then(function(data){ 
      if (data.count != socket.newMessage){
        if (location == "/chathome" && typeof socket.newMessage != "undefined"){
          for (var i = socket.newMessage; i < data.count; i++) {
              var incomingMessage = {
                msg:data.rows[i].dataValues.message,
                updateId:data.rows[i].dataValues.MatchedId
              }
            io.to(socket.id).emit('incomingMessage', incomingMessage);    
          }
        }
        callback("newMessage", data.count, socket);
        //what?
        io.to(socket.id).emit('newMessage', data.count);
      }
    });
  }
  newMessage();
  setTimeout(newMessage, 2000);
  setTimeout(newMessage, 4000);
  setTimeout(newMessage, 6000);
  setTimeout(newMessage, 8000);
}

exports.online = function(socket, io){
  var dataArray = socket.handshake.session.dataArray
  function online(){
    models.Online.findAll(
      {where:{user:{$in:dataArray}}, 
      attributes: ["user", "online" ]
    }).then(function(data){
      debugger
      if (socket.onlineStatus == undefined){
        io.to(socket.id).emit('onlineStatus', data);      
        callback("onlineStatus", data, socket);
      }
      else{
        debugger
        var updateArray = []
        var onlineArray = socket.onlineStatus
        for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < onlineArray.length; j++) {
            if (data[i].dataValues.user == onlineArray[j].dataValues.user 
              && data[i].dataValues.online != onlineArray[j].dataValues.online){
              debugger
              updateArray.push(data[i]);
              socket.onlineStatus[j].dataValues.online = data[i].dataValues.online;
         
              onlineArray.splice(j, j+1);
              break
            }
          }
        }
        if (updateArray.length < 1){return true}
        else {
          debugger
          callback("onlineStatus", socket.onlineStatus, socket);
          io.to(socket.id).emit('onlineStatus', updateArray); 
        }     
      }
    });
  }
  online();
  setTimeout(online, 5000);
}
