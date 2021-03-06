$( document ).ready(function() {
	var socket = io();
	var currentData
	$.ajax({url: "/findChat", success: function(result){
		if (result.length < 1){
			$(".sorry").show()
		}
	 chatArray = []
		for (var i = 0; i < result.length; i++) {
			chatArray.push(result[i].id)
		  $(".target").append("<button data-match='" + result[i].id +"'class='chat col-xs-12 btn ' value=" 
		 	+ result[i].updateId + "><div class='row '><h5 class='pull-left'>" + result[i].firstname + " "
		 	+result[i].lastname + ":</h5><span id='" + result[i].id  
		 	+ "' class=''>.</span> </div><div class='messageDisplay'><span id='" + result[i].updateId + "' class='pull-left " 
		 	+ result[i].checked +  result[i].user +"'>"
		 	+ result[i].msg + "</span></div></button>")
		}
	}}).then(function(){
		socket.emit("online", chatArray)
	});
	socket.on("onlineStatus", function(data){
		for (var i = 0; i < data.length; i++) {
			$("#"+ data[i].user).removeClass().addClass("online" + data[i].online)
		}

	});
	$(".target").on("click", ".chat", function(){
			var match = this.value;
			var uuid = $(this).attr("data-match");
		$.ajax({url: "/chatId", type:"POST", data:{match:match, uuid: uuid},  success: function(result){
			 window.location = "/chat"
		}});
	});
});
