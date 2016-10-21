$( document ).ready(function() { 
	var socket = io();
		socket.on("onlineStatus", function(data){
		debugger
		console.log(data)
	})
  socket.on("score", function(score){
 		$("#score").text(score);
	});
	socket.on("notify", function(notify){
 		$("#notify").text(notify);
	});
	socket.on("newMessage", function(newMessage){
 		$("#newMessage").text(newMessage);
	});
	socket.on("foundChat", function(result) {
			for (var i = 0; i < result.length; i++) {
		  $(".target").append("<button class='chat col-xs-12 btn btn-default' value=" 
		 	+ result[i].arrayId + "><h4 class='pull-left'>" + result[i].firstname + " "
		 	+result[i].lastname + ":</h4><br><span id='" + result[i].updateId + "' class='pull-left " + 
		 	 result[i].checked +  result[i].user
		 	+"'>"
		 	+ result[i].msg + "</span></button>")
		}
	// socket.emit("online")
	})
	socket.on("incomingMessage", function(data){
 		$("#" + data.updateId).text(data.msg).removeClass().addClass("falseother pull-left");
	});
	var location = window.location.pathname
  socket.emit('login', location)
  socket.on('disconnect', function () {
  	//possible android fix
    window.location = "/"
	});
		socket.on("chatIdDone", function(data){
				window.location ="/chat"

		})
});