
function append(data, role){
	$.each(data, function(key, element) {
		if (role=="myQuestions"){$("#" + key).val(element);}
		else if (role=="prime"){$("#" + key).text(element);}
		else if (role=="match"){$("#m" + key).text(element);}
	});
}

function formCheck(url){
	// var array = []
	var input = jQuery.makeArray(document.getElementsByTagName("input"));
	var textarea = jQuery.makeArray(document.getElementsByTagName("textarea"))
	var select = jQuery.makeArray(document.getElementsByTagName("select"))
	var elements = input.concat(select, textarea);
	var array = jQuery.makeArray(elements)
	var counter = 0
		var error = []
		var data = {}
	for (var i = 0; i < array.length; i++) {
		// array.push(unsortedArray[i].id)
		counter++
			data[array[i].id] = $("#" + array[i].id).val();
			if (data[array[i].id] == null || data[array[i].id].length < 1 ){error.push(i);}
			if (counter == array.length ){
				if (error.length < 1){
					$.ajax({url: url, type:"POST", data:data, success: function(result){
						debugger
						if (result == "greeting"){window.location.pathname = "/myQuestions";}
						else if (result == "myInfo" || result == "myQuestions") {window.location.pathname = "/myProfile";}
						else if (result == "taken"){$(".errorMsg").show();}
						else if (result == "accept"){
							window.location.pathname="/";
						}
					}});
				}
				else{
					for (var i = 0; i < error.length; i++) {

						$("#" + array[error[i]].id).addClass("error");
					}
				}
			}
	}

}
