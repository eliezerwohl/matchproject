$( document ).ready(function() {
  function chatSize (){
    var height = ($(window).height()); 
    $("#chatBox").css("height", height-147 + "px")
    $('#chatBox').scrollTop($('#chatBox')[0].scrollHeight);
  }
  chatSize(0)
  $(window).resize(chatSize);
  var id
  var socket = io();
	$.ajax({url: "/chatName", success: function(result){
    $("#name").append(result.firstname + " " + result.lastname)
  }}).then(function(){
    $.ajax({url: "/chatHistory", success: function(result){
    for (var i = 0; i < result.length; i++) {
      $('#messages').append($('<div>').text(result[i].message).addClass(result[i].user).addClass("col-xs-12"));
    }
    }}).then(function(){
      $('#chatBox').scrollTop($('#chatBox')[0].scrollHeight);
      socket.emit('room', "data");
    });
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
     $('#chatBox').scrollTop($('#chatBox')[0].scrollHeight);
  });
  socket.on('message', function(msg){
    id = msg
  });
});

