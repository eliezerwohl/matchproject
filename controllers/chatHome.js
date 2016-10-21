$( document ).ready(function() {
	 var socket = io();
	$.ajax({url: "/findChat", success: function(result){
		for (var i = 0; i < result.length; i++) {
		 $(".target").append("<button data-match='" + result[i].updateId +"'class='" + result[i].checked 
		 	+ " chat col-xs-12 btn btn-default' value=" 
		 	+ result[i].arrayId + "><h4 class='pull-left'>" + result[i].firstname + " "
		 	+result[i].lastname + "</h4><br><span id='" + result[i].updateId + "'>"
		 	+ result[i].msg + "</span></button>")
		}
	}});
	$(".target").on("click", ".chat", function(){
		
		var data = this.value;
		var match = $(this).attr("data-match");
		$.ajax({url: "/chatId", type:"POST", data:{data:data},  success: function(result){
			 window.location = "/chat"
	}})
	})
});
