$( document ).ready(function() { 
	socket = io()
	socket.emit("notify")
	});