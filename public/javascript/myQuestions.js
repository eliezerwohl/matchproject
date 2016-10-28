$( document ).ready(function() {
	$( "#myInfoForm, #myQuestionsForm" ).submit(function( event ) {
    var form = formCheck(undefined, true)
    if (form == true) {return}
    event.preventDefault();
  });
	if (window.location.pathname == "/myInfo"){
	$.ajax({url: "/myInfoData", success: function(result){
		if (result === "blank"){return false}
		else {append(result, "myQuestions");}
	}});
	}
	else{
		$.ajax({url: "/myQuestionsData", success: function(result){
		if (result === ""){return false}
		else {append(result, "myQuestions");}
	}});
	}
});