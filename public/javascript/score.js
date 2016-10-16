$( document ).ready(function() { 
	var socket = io();
  socket.on("score", function(score){
 		$("#score").text(score);
	});
	socket.on("notify", function(notify){
 		$("#notify").text(notify);
	});
	socket.on("newMessage", function(newMessage){
 		$("#newMessage").text(newMessage);
	});
	socket.on("incomingMessage", function(data){
		debugger
 		$("#" + data.updateId).text(data.msg);
	});
	var location = window.location.pathname
  socket.emit('login', location)
});