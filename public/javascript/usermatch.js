// $("#status").on("click", function(){
$( document ).ready(function() {
	$(".save").on("click", function(){
		var data =(this).value;
		$.ajax({url: "/userSave", type:"POST", data:{data:data}, success: function(result){}});
				window.location.pathname = "/loggedIn"
	})	
	$.ajax({url: "/userMatch", success: function(result){
		debugger
	 if ( result === "today"){
	 		alert("account was created today.  Please wait")
		}
		else if (result == "done"){
			alert("you already had one, check back tomorrow ")
		}
		else{
			append(result, "prime")
		}
	}});
});


	// 	$.ajax({url: "/userSave", success: function(result){
	//  if ( result === "today"){
	//  		alert("account was created today.  Please wait")
	// 	}
	// 	else{
	// 		append(result, "prime")
	// 	}
	// }});
// });