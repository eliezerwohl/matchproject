$( document ).ready(function() { 
	var socket = io();
	setInterval(pulse, 5000)
	function pulse(location){
		socket.emit("pulse")
	}


		socket.on("onlineStatus", function(data){
		console.log(data)
	})
  socket.on("score", function(score){
  	debugger
 		$("#score").text(score);
	});
	socket.on("notify", function(notify){
 		$("#notify").text(notify);
	});
	socket.on("newMessage", function(newMessage){
 		$("#newMessage").text(newMessage);
	});
	socket.on("incomingMessage", function(data){
 		$("#" + data.updateId).text(data.msg).removeClass().addClass("falseother pull-left");
	});
	var location = window.location.pathname
  socket.emit('login', location)
  socket.on('disconnect', function () {
  	//possible android fix
    window.location = "/"
	});
});