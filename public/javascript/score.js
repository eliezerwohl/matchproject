$( document ).ready(function() { 
	var socket = io();
	$.ajax({url: "/score", success: function(result){
		$("#score").text(result.score);
	}});
  socket.on("score", function(score){
 		$("#score").text(score);
	});
  socket.emit('login')
});