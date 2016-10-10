//make this load on page load
$( document ).ready(function() {
	$("#match").hide();
	$("#matchButtons").hide()
	$.ajax({url: "/findPrime", success: function(result){
		 	$("#primeModal").modal("show");
		 	append(result, "prime")
		}});
	$(".next").on("click", function(){
			 $.ajax({url: "/nextPrime", success: function(result){
			 		if (result === false){
					alert("no more matches match")
				}
				else{
			 	append(result, "prime");
			 }
		}});
	});

	$("#getMatch").on("click", function(){
		$.ajax({url: "/getMatch", success: function(result){
				if (result === false){
					alert("no more matches match")
				}
				else{
					$("#primeModal").modal("hide");
					$("#primeButtons").hide()
					$("#matchButtons").show()
					$("#match").show()
					append(result, "match");
				}
		}})
	})

	$("#nextMatch").on("click", function(){
		$.ajax({url: "/nextMatch", success: function(result){
				if (result === false){
					alert("no more matches match")
				}
				else{
			 	append(result, "match");
			 }
		}})
	})

	$("#save").on("click", function(){
	alert("save")
		})

	$(".save").on("click", function(){
		var data =(this).value;

		$.ajax({url: "/saveMatch", type:"POST", data:{data:data}, success: function(result){
				console.log(result)
		}})
	})

});
