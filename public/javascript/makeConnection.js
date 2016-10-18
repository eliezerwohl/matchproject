// //make this load on page load
$( document ).ready(function() {
	function getPrime(){
	$(".frontDiv, #primeButtons").show();
	$(".frontDiv").on("swiperight",function(){
  	getMatch();
	});
	$(".frontDiv").on("swipeleft",function(){
  	next();
	});
	getPrime();

	$.ajax({url: "/findPrime", success: function(result){;
		 	append(result, "prime");
		}});
	}
	function next(){
			$.ajax({url: "/nextPrime", success: function(result){
			if (result === false){
				getPrime();
			}
			else{
			 	append(result, "prime");
			 }
		}});
	}
	$(".next").on("click", function(){
		next();
	});
//get match
	function getMatch(){
		$.ajax({url: "/getMatch", success: function(result){
			$(".frontDiv").off("swipeleft swiperight");
			if (result === false){
				//you've matched everybody
				getPrime()
				$("#warningModal").modal("show");
			}
			else{
				$(".frontDiv").hide();
				$("#primeButtons").hide();
				$("#matchButtons").show();
				$(".toggle").show();
				$("#match").show();
				append(result, "match");
			}
		}});
	}

	$("#getMatch").on("click", function(){
		getMatch();
	});

	function nextMatch(){
		$.ajax({url: "/nextMatch", success: function(result){
			if (result === false){
				getPrime()
				$("#warningModal").modal("show")
			}
			else{
		 		append(result, "match");
		 	}
		}});
	}

	$("#nextMatch").on("click", function(){
		nextMatch();
	})

	function save(data){
		$.ajax({url: "/saveMatch", type:"POST", data:{data:data}, success: function(result){
			nextMatch();
		}});
	}
	$(".save").on("click", function(){
		var data =(this).value;
		save(data);
	});
	$(".matchDiv").on("swipeleft",function(){
  	save(0);
	});
	$(".matchDiv").on("swiperight",function(){
  	save(1);
	});

	$(".toggle").on("click", function(){
		$(".frontDiv").toggle()
	});
});


