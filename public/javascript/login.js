$( document ).ready(function() {
	function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    	}
    	return "";
		}
 		if (getCookie("signup") == "true"){
 			$(".thanks").show()
 			document.cookie = "signup=; expires=Thu, 01 Jan 1970 00:00:00 UTC"		
		}
		$("#loginButton").on("click", function(){
			alert("Hell")
			formCheck("/login")
		})
	





});