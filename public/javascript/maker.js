
$(".find").on("click", function(){
	 $.ajax({url: "/findPrime", success: function(result){
	 	debugger
	 }});
})

$(".next").on("click", function(){
		 $.ajax({url: "/nextPrime", success: function(result){
		 	debugger
	 }});


})
