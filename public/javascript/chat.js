$( document ).ready(function() {
  var id
  var socket = io();
	$.ajax({url: "/chatName", success: function(result){
    $("#name").append(result.firstname + " " + result.lastname)
  }}).then(function(){
    $.ajax({url: "/chatHistory", success: function(result){
    for (var i = 0; i < result.length; i++) {
      $('#messages').append($('<li>').text(result[i].message).addClass(result[i].user));
    }
    }}).then(function(){
    socket.emit('room', "data");
  })
  });

  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

  socket.on('chat message', function(msg){  
    if (id === msg.id){
      $('#messages').append($('<li>').text(msg.msg).addClass("user"));
    }
    else {
       $('#messages').append($('<li>').text(msg.msg).addClass("other"));
    }
  });
  socket.on('message', function(msg){
    id = msg
  });
});

