// //make this load on page load
$( document ).ready(function() {
			$(".toggle").hide()

	$("#match").hide();
	$("#matchButtons").hide()
	function getPrime(){
	$.ajax({url: "/findPrime", success: function(result){
		 	$("#primeModal").modal("show");
		 	append(result, "prime")
		}});
	}
	getPrime()
	$(".next").on("click", function(){
		$.ajax({url: "/nextPrime", success: function(result){
			if (result === false){
				getPrime()
			}
			else{
			 	append(result, "prime");
			 }
		}});
	});

	$("#getMatch").on("click", function(){
		$.ajax({url: "/getMatch", success: function(result){
				if (result === false){
					//thre are no more matches, please click here
					//to choose another connection
				}
				else{
					$(".frontDiv").hide()
					$("#primeButtons").hide()
					$("#matchButtons").show()
					$(".toggle").show()
					$("#match").show()
					append(result, "match");
				}
		}})
	});

	$("#nextMatch").on("click", function(){
		$.ajax({url: "/nextMatch", success: function(result){
				if (result === false){
								//thre are no more matches, please click here
					//to choose another connection
					alert("no more matches match")
				}
				else{
			 	append(result, "match");
			 }
		}})
	})

	$(".save").on("click", function(){
		var data =(this).value;

		$.ajax({url: "/saveMatch", type:"POST", data:{data:data}, success: function(result){
				console.log(result)
		}});
	});


$(".toggle").on("click", function(){
	$(".frontDiv").toggle()
})

});


