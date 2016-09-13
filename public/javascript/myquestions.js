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
			 debugger
    }});

