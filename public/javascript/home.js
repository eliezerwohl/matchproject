$( document ).ready(function() { 
		$.ajax({url: "/homecheck", success: function(result){
			if (result == "false"){
				return true
			}
			else {
			$("#welcomeModal").modal("show")
		}
	}});
	$.ajax({url: "/loginData", success: function(result){
		if (result.match == true) {
			$('#myMatch').on('click', function(){
				window.location.pathname = "/myMatch"
			});
		}
		else {
			$('#myMatch').prop("disabled", true)
		}
	}});
});