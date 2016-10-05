$( document ).ready(function() {
  var socket = io();
	// $.ajax({url: "/chatroom", success: function(result){
	//  debugger
     socket.emit('room', "data");
	// }});	


  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

  socket.on('chat message', function(msg){
      $('#messages').append($('<li>').text(msg));
    });
  });

