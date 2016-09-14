
$(".find").on("click", function(){
	 $.ajax({url: "/findPrime", success: function(result){
	 	console.log("good")
	 }});
})

$(".next").on("click", function(){
		 $.ajax({url: "/nextPrime", success: function(result){

	 }});


})
