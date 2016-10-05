$( document ).ready(function() {
	$.ajax({url: "/chatRoom", success: function(result){
		var socket = io();
    $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  	socket.on('chat message', function(msg){
    	$('#messages').append($('<li>').text(msg));
  	});
	}});	
});