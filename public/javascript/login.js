

$( document ).ready(function() {
    function submitFunction(){
      document.getElementById("loginForm").submit();
    }

	function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {c = c.substring(1);}
        if (c.indexOf(name) == 0) {return c.substring(name.length,c.length);}
    	}
    	return "";
		}
 		if (getCookie("signup") == "true"){
 			$(".thanks").show();
 			document.cookie = "signup=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
		}
    if  (window.location.search == "?success") { $(".thanks").show();}
		if (window.location.search == "?incorrect") { $(".incorrect").show();}
    $(".loginButton" ).on("click", function(){ formCheck("/login");});
		$( "#loginForm" ).submit(function( event ) {
      var form = formCheck(undefined, true)
      if (form == true) {return}
      event.preventDefault();
    });
    document.getElementById("demo").addEventListener("click", function(){
      document.getElementById("password").value ="demo";
      document.getElementById("email").value = "demoPerson@demo.com"
      submitFunction()
    });
    document.getElementById("loginButton").addEventListener("click", submitFunction);
  $('#login').keypress(function (e) {
    if (e.which == 13) {
      submitFunction()
    return false;    //<---- Add this line
  }
});

});