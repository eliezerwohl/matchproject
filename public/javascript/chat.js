$( document ).ready(function() {
  $("#chatInput").bind('touchmove', function(e){e.preventDefault()})
  function chatSize (){
    var height = ($(window).height()); 
    $("#chatBox").css("height", height-147 + "px")
    $('#chatBox').scrollTop($('#chatBox')[0].scrollHeight);
  }
  chatSize(0)
  $(window).resize(chatSize);
  var id; var uuid;
  var socket = io();
	$.ajax({url: "/chatName", success: function(result){
    uuid = result.uuid
    $("#status").append("<span id='" + result.uuid  + "' class=''>.</span></span>")
    $("#name").append(result.firstname + " " + result.lastname)
  }}).then(function(){
    $.ajax({url: "/chatHistory", success: function(result){
    for (var i = 0; i < result.length; i++) {
      $('#messages').append($('<div>').text(result[i].message).addClass(result[i].user).addClass("col-xs-12"));
    }
    }}).then(function(){
      socket.emit("online", [uuid])
  });
  socket.on("onlineStatus", function(data){
    for (var i = 0; i < data.length; i++) {
      $("#"+ data[i].user).removeClass().addClass("online" + data[i].online)
    }
    $('#chatBox').scrollTop($('#chatBox')[0].scrollHeight);
      socket.emit('room', "data");
    });
  });

  function sendMessage(){
    var msg =  $('#m').val()
    if (/\S/.test(msg)) {
      //checks to make sure it's not all blank
      socket.emit('chat message', msg);
     $('#m').val('')
    }
  }

  $("#m").on('keyup', function (e) {
    e.preventDefault
    if (e.keyCode == 13) { sendMessage();}
  });
  $('#send').on("click", function(){sendMessage();});

  socket.on('chat message', function(msg){  
    var user;
    if (id === msg.id){user = "user";} else {user= "other";}
     $('#messages').append($('<li>').text(msg.msg).addClass(user).addClass("col-xs-12"));
     $('#chatBox').scrollTop($('#chatBox')[0].scrollHeight);
  });
  socket.on('message', function(msg){id = msg});
});

