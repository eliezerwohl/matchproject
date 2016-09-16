function buttonColor(result){

	 if (result === true){
	 	debugger
 		$("#status").addClass("btn-success").removeClass("btn-danger")
 		.text("Live");
 		}
 		else{
 			 		$("#status").addClass("btn-danger").removeClass("btn-success")
 			 		.text("not live");
 		}


}
$.ajax({url: "/currentStatus", success: function(result){
	buttonColor(result);

}})

$("#status").on("click", function(){
	$.ajax({url: "/updateStatus", success: function(result){
		buttonColor(result);
	}})
})
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

