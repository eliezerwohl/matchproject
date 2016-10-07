$.ajax({url: "/myInfo", success: function(result){

	if (result === "blank"){

		return false
	}
	else {

	append(result, "myQuestions")
	}
}});
  // wont submit unless everything has been answered
$("#submit").submit(function(event){
	var select = Array.from(document.getElementsByTagName("select"));
	var input = Array.from(document.getElementsByTagName("input"));
	var textareas = Array.from(document.getElementsByTagName("textarea"));
	var allInputs = input.concat(textareas, select);
	for (var i = 0; i < allInputs.length; i++) {
		if (allInputs[i].value === ""){	
			break;
		}
		else if(i === allInputs.length - 1) {
			return true;
		}
	}
  event.preventDefault();
});

