$( document ).ready(function() {
	function buttonColor(result){
		if (result === true){
			$("#status").addClass("btn-success").removeClass("btn-danger");
	 		$("#statusText").text("Live");
	 	}
	 	else{
	 		$("#status").addClass("btn-danger").removeClass("btn-success");
	 		$("#statusText").text("not live");
	 	}
	}
	$.ajax({url: "/currentStatus", success: function(result){
		buttonColor(result);
	}})

	$("#status").on("click", function(){
		$.ajax({url: "/updateStatus", success: function(result){
			buttonColor(result);
		}})
	})
});