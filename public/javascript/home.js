$( document ).ready(function() { 
	$.ajax({url: "/loginData", success: function(result){
		$("#score").text(result.score);
		debugger
		if (result.match == true) {
			$('#myMatch').on('onclick', function(){
				console.log("work")
			});
		}
		else {
			$('#myMatch').prop("disabled", true)
		}
	}});
});