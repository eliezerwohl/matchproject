var array = [];
$.ajax({url: "/myInfo", success: function(result){
	$.each(result, function(key, element) {
		var key = key;
		var element = element;
		if (key === "id" || key == "createdAt" || key == "updatedAt") {
			return true
		}
		else {
		var object = {location:key, value:element}
		array.push(object);
		}
	});
	 for (var i = 0; i < array.length; i++) {
	 	var location = ("#" + array[i].location);
	 	$(location).val(array[i].value);
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

