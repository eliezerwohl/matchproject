var session = require('express-session')

exports.save = function(msg, socket){
	debugger
	console.log(socket.handshake.session.UserId)
	console.log(msg)
}