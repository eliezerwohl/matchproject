$( document ).ready(function() {
	$.ajax({url: "/findChat", success: function(result){
		debugger

		for (var i = 0; i < result.length; i++) {
		 $(".target").append("<button class='chat' value=" + result[i].arrayId + ">" + result[i].firstname 
		 	+ result[i].msg + "</button>")
		}
	}});

	$(".target").on("click", ".chat", function(){
		var data = this.value;
		$.ajax({url: "/chatId", type:"POST", data:{data:data},  success: function(result){
			 window.location = "/chat"
	}})
	})
});
