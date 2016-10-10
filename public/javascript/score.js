$( document ).ready(function() { 
	$.ajax({url: "/score", success: function(result){
		debugger

		$("#score").append(result.score)
	}})
 var socket = io();

 socket.on("score", function(msg){
 	console.log(msg)
 })

 socket.emit('login', function(msg){  

 	})

});