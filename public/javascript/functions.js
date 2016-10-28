function append(data, role){
	$.each(data, function(key, element) {
		if (role=="myQuestions"){$("#" + key).val(element);}
		else if (role=="prime"){$("#" + key).text(element);}
		else if (role=="match"){$("#m" + key).text(element);}
	});
}

function formCheck(){
	var array = jQuery.makeArray(document.getElementsByClassName("input"));
	var counter = 0;var error = [];var data = {};
	for (var i = 0; i < array.length; i++) {
		counter++;data[array[i].id] = $("#" + array[i].id).val();
		if (data[array[i].id] == null || data[array[i].id].length < 1 ){error.push(i);}
		if (counter == array.length ){
			if (error.length < 1){return true}
			else {
				for (var i = 0; i < error.length; i++) {
					$("#" + array[error[i]].id).addClass("error");
				}
			}
		}
	} 
}
