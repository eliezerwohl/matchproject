$( document ).ready(function() {
	$(".save").on("click", function(){
		var data =(this).value;
		$.ajax({url: "/userSave", type:"POST", data:{data:data}, success: function(result){
			//?
		}});
			window.location.pathname = "/loggedIn"
	});	
	$.ajax({url: "/userMatch", success: function(result){
	 if ( result === "sorry"){
	 		$("#warningModal").modal("show")
	 		$("#modalText").text("sorry, not matches.  please check another time")
		}
		else if (result == "done"){
			$("#warningModal").modal("show")
	 		$("#modalText").text("you already had one, check back tomorrow")
		}
		else{
			append(result, "prime")
		}
	}});
});
