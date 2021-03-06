$( document ).ready(function() { 
	var socket = io();
	var location = window.location.pathname;
  socket.on("score", function(score){
 		$("#score").text(score);
	});
	socket.on("notify", function(notify){$("#notify").text(notify);});
	if (location == "/chathome"){socket.emit("checkedNotify")}
	socket.on("newMessage", function(newMessage){$("#newMessage").text(newMessage);});
	socket.on("incomingMessage", function(data){
 		$("#" + data.updateId).text(data.msg).removeClass().addClass("falseother pull-left");
	});
  socket.emit('login', location);
  socket.on('disconnect', function () {
  	//possible android fix
    window.location = "/"
	});
});