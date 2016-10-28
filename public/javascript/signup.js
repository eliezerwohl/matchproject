$( document ).ready(function() {
	if (window.location.search == "?taken") { $(".errorMsg").show();}
	
	// $("#signup").on("click", function(){
	// 	formCheck("/signUp")
	// });
		$( "#signupForm" ).submit(function( event ) {
      var form = formCheck(undefined, true)
      if (form == true) {return}
      event.preventDefault();
    });
});