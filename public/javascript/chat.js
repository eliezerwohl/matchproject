$( document ).ready(function() {
  $("#chatInput").bind('touchmove', function(e){e.preventDefault()})
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

  $('#send').on("click", function(){
    var msg =  $('#m').val()
    if (/\S/.test(msg)) {
      //checks to make sure it's not all blank
      socket.emit('chat message', msg);
     $('#m').val('')
    }
  });

  socket.on('chat message', function(msg){  
    if (id === msg.id){
      $('#messages').append($('<li>').text(msg.msg).addClass("user").addClass("col-xs-12"));
    }
    else {
      $('#messages').append($('<li>').text(msg.msg).addClass("other").addClass("col-xs-12"));
    }
     $('#chatBox').scrollTop($('#chatBox')[0].scrollHeight);
  });
  socket.on('message', function(msg){
    id = msg
  });
});

