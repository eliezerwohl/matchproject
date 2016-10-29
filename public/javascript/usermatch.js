$( document ).ready(function() {
		function chatSize (){
    var height = ($(window).height()); 
    $("#chatBox").css("height", height-117 + "px")
  }
  chatSize()
  $(window).resize(chatSize);
	$(".save").on("click", function(){
		var data =(this).value;
		$.ajax({url: "/userSave", type:"POST", data:{data:data}, success: function(result){
			//?
		}});
			window.location.pathname = "/loggedIn"
	});	
	$.ajax({url: "/userMatch", success: function(result){
		debugger
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
