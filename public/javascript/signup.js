$( document ).ready(function() {
	if (window.location.search == "?taken") { $(".errorMsg").show();}
		$( "#signupForm" ).submit(function( event ) {
      var form = formCheck(undefined, true)
      if (form == true) {return}
      event.preventDefault();
    });
});