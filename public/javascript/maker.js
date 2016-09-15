//make this load on page load
$(".find").on("click", function(){
	 $.ajax({url: "/findPrime", success: function(result){
	 	$.each(result, function(key, element) {
			$("#" + key).text(element);
		});
	}});
})

$(".next").on("click", function(){
		 $.ajax({url: "/nextPrime", success: function(result){
		 		$.each(result, function(key, element) {
			$("#" + key).text(element);
		});
	}});
});
