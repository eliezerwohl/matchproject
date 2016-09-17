function append(data, role){
	$.each(data, function(key, element) {
		if (role=="myQuestions"){$("#" + key).val(element);}
		else if (role=="prime"){$("#" + key).text(element);}
		else if (role=="match"){$("#m" + key).text(element);}
	});
}
