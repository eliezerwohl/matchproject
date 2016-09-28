// $("#status").on("click", function(){
	$.ajax({url: "/userMatch", success: function(result){
		if (result == "none"){

		}
		else if ( result === "today"){

		}
		else{
				append(result, "prime")
		}

		
	
	}})
// })