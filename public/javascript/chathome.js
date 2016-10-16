$( document ).ready(function() {
	$.ajax({url: "/findChat", success: function(result){

		for (var i = 0; i < result.length; i++) {
		 $(".target").append("<button class='" + result[0].checked 
		 	+ " chat col-xs-12 btn btn-default' value=" 
		 	+ result[i].arrayId + "><h4 class='pull-left'>" + result[i].firstname + " "
		 	+result[i].lastname + "</h4><br>"
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
