$( document ).ready(function() { 
	var socket = io();
	var location = window.location.pathname;
	setInterval(pulse, 5000)
	function pulse(){
		socket.emit("pulse", location)
	}
	// socket.on("onlineStatus", function(data){
	// 	console.log(data)
	// })
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
 		$("#" + data.updateId).text(data.msg).removeClass().addClass("falseother pull-left");
	});
  socket.emit('login', location)
  socket.on('disconnect', function () {
  	//possible android fix
    window.location = "/"
	});
});