$( document ).ready(function() {
	$("#myInfo").on("click", function(){
		var data = {
			seeking:$("#seeking").val(),
			age:$("#age").val(),
			city:$("#city").val(),
			gender:$("#gender").val(),
			upper:$("#upper").val(),
			lower:$ ("#lower").val()
		}
		$.ajax({url: "/myInfoUpdate", type:"POST", data:data, success: function(result){
			$("#myModal").modal("hide");
			if ($("#a091202").val() == ' '){
				$("#myModal2").modal("show")
			}
		}});
	});


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