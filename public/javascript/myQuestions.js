$( document ).ready(function() {
	$("#myInfo").on("click", function(){
		formCheck("/myInfoUpdate");
	});

	$("#myQuestions").on("click", function(){
		formCheck("/myQuestionsUpdate");
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