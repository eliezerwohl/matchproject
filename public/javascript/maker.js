function append(data){
		$.each(data, function(key, element) {
			$("#" + key).text(element);
		});

}
//make this load on page load
$(".find").on("click", function(){
	 $.ajax({url: "/findPrime", success: function(result){
	 	append(result)
	}});
})

$(".next").on("click", function(){
		 $.ajax({url: "/nextPrime", success: function(result){
		 	append(result);
	}});
});
