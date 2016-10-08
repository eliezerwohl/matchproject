$( document ).ready(function() {
	var infoArray = ["seeking", "age", "city", "gender", "upper", "lower"]
	var questionArray = ["a091201", "a091202", "a091203", "a091204"]
//on first login, modal "welcome, would you like to setup your connection profile?  It'll only take a few minutes
//or if your just here to help connect others, click here

	$("#myInfo").on("click", function(){
		myProfile(infoArray, "/myInfoUpdate")
	})

	$("#myQuestions").on("click", function(){
		myProfile(questionArray, "/myQuestionsUpdate")
	});

	function myProfile(array, url){
		var counter = 0
		var error = []
		var data = {}
		for (var i = 0; i < array.length; i++) {
			counter++
			data[array[i]] = $("#" + array[i]).val();
			debugger
			if (data[array[i]] == null || data[array[i]].length < 1 ){
				error.push(i);
			}
			if (counter == array.length ){
				if (error.length < 1){
					$.ajax({url: url, type:"POST", data:data, success: function(result){
						$("#myModal").modal("hide");
						//will auto bring up the questions if the user hasn't filled them out
						if ($("#a091202").val() == ' '){
							$("#myModal2").modal("show")
						}
					}});
				}
				else{
					for (var i = 0; i < error.length; i++) {
						$("#" + array[error[i]]).addClass("error");
					}
				}
			}
		}
	}
	$.ajax({url: "/myInfoData", success: function(result){
		if (result === "blank"){
			return false
		}
		else {
			append(result, "myQuestions")
		}
	}});
});