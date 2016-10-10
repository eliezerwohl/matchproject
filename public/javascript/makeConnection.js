// //make this load on page load
$( document ).ready(function() {
	function getPrime(){
	$(".frontDiv, #primeButtons").show();
	$(".toggle, #match, #matchButtons").hide()

	$.ajax({url: "/findPrime", success: function(result){;
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
			debugger
				if (result === false){
					//you've matched everybody
					console.log("You've matched everyone for this person");
					$("#warningModal").modal("show")
					getPrime()
				}
				else{
					$(".frontDiv").hide()
					$("#primeButtons").hide()
					$("#matchButtons").show()
					$(".toggle").show()
					$("#match").show()
					append(result, "match");
				}
		}});
	});

	function nextMatch(){
		$.ajax({url: "/nextMatch", success: function(result){
			if (result === false){
				$("#warningModal").modal("show")
				getPrime()
			}
			else{
		 		append(result, "match");
		 	}
		}});
	}

	$("#nextMatch").on("click", function(){
		nextMatch()
	})

	$(".save").on("click", function(){
		var data =(this).value;
		$.ajax({url: "/saveMatch", type:"POST", data:{data:data}, success: function(result){
			nextMatch()
		}});
	});

	$(".toggle").on("click", function(){
		$(".frontDiv").toggle()
	});
});


