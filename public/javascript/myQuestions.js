$( document ).ready(function() {
	var infoArray = ["seeking", "age", "city", "gender", "upper", "lower"]
	var questionArray = ["a091201", "a091202", "a091203", "a091204"]
	$("#myInfo").on("click", function(){
		formCheck("/myInfoUpdate")
	});

	$("#myQuestions").on("click", function(){
		formCheck("/myQuestionsUpdate")
	});

	
	$.ajax({url: "/myInfoData", success: function(result){
		if (result === "blank"){return false}
		else {append(result, "myQuestions");}
	}});
});