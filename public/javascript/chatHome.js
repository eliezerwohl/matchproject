$( document ).ready(function() {
	var socket = io();
	$.ajax({url: "/findChat", success: function(result){
		debugger
		for (var i = 0; i < result.length; i++) {
		  $(".target").append("<button class='" + result[i].updateId  + " " + result[i].checked +  result[i].user
		 	+ " chat col-xs-12 btn btn-default' value=" 
		 	+ result[i].arrayId + "><h4 class='pull-left'>" + result[i].firstname + " "
		 	+result[i].lastname + "</h4><br><span id='" + result[i].updateId + "'>"
		 	+ result[i].msg + "</span></button>")
		}
	}});
	$(".target").on("click", ".chat", function(){
		var data = this.value;
		$.ajax({url: "/chatId", type:"POST", data:{data:data},  success: function(result){
			 window.location = "/chat"
		}});
	});
});
