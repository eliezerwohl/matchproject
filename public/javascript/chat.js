$( document ).ready(function() {
  var socket = io();
	$.ajax({url: "/chatHistory", success: function(result){
    for (var i = 0; i < result.length; i++) {
      $('#messages').append($('<li>').text(result[i].message));
    }
  }}).then(function(){
    socket.emit('room', "data");
  });

  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });
});

