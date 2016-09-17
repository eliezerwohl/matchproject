//make this load on page load
$(".find").on("click", function(){
	 $.ajax({url: "/findPrime", success: function(result){
	 	append(result, "prime")
	}});
})

$(".next").on("click", function(){
		 $.ajax({url: "/nextPrime", success: function(result){
		 	append(result, "prime");
	}});
});

$("#getMatch").on("click", function(){
	$.ajax({url: "/getMatch", success: function(result){
				append(result, "match");
	}})
})

$("#nextMatch").on("click", function(){
	$.ajax({url: "/nextMatch", success: function(result){
				append(result, "match");
	}})
})


