$( document ).ready(function() {
	var infoArray = ["seeking", "age", "city", "gender", "upper", "lower"]
	var data;
	$("#myInfo").on("click", function(){
		var counter = 0
		var error = []
		data = {}

		for (var i = 0; i < infoArray.length; i++) {
			counter++
			data[infoArray[i]] = $("#" + infoArray[i]).val();
			debugger
			if (data[infoArray[i]] == null || data[infoArray[i]].length < 1 ){
				error.push(i);
			}
			if (counter == infoArray.length ){
				if (error.length < 1){
					$.ajax({url: "/myInfoUpdate", type:"POST", data:data, success: function(result){
					$("#myModal").modal("hide");
					//will auto bring up the questions if the user hasn't filled them out
					if ($("#a091202").val() == ' '){
						$("#myModal2").modal("show")
					}
				}});
				}
				else{
					for (var i = 0; i < error.length; i++) {
						$("#" + infoArray[error[i]]).addClass("error");
					}
				}
			}
		}

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

});