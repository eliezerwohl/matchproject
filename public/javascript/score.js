$( document ).ready(function() { 
	var socket = io();
  socket.on("score", function(score){
 		$("#score").text(score);
	});
	socket.on("notify", function(notify){
 		$("#notify").text(notify);
	});

  socket.emit('login')
});