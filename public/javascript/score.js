$( document ).ready(function() { 
	$.ajax({url: "/score", success: function(result){
		debugger

		$("#score").text(result.score)
	}})
 var socket = io();

 socket.on("score", function(score){
 	$("#score").text(score)
 })

 socket.emit('login', function(msg){  

 	})

});