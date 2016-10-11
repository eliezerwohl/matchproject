$( document ).ready(function() { 
	var socket = io();
  socket.on("score", function(score){
 		$("#score").text(score);
	});
  socket.emit('login')
});