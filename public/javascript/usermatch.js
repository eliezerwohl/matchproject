// $("#status").on("click", function(){
	$.ajax({url: "/userMatch", success: function(result){
	 if ( result === "today"){
	 		alert("account was created today.  Please wait")
		}
		else{
			append(result, "prime")
		}
	}});
