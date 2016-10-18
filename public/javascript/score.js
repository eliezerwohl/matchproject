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

 		$("#" + data.updateId).text(data.msg);
 		$("." + data.updateId).addClass("falseother")
	});
	var location = window.location.pathname
  socket.emit('login', location)
  socket.on('disconnect', function () {
  	//possible android fix
    location.reload();
	});
});