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
			 	debugger
			 	var location = ("#" + array[i].location);
			 	$(location).val(array[i].value);
			 }
    }});

