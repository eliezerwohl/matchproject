var array = [];
    $.ajax({url: "/myInfo", success: function(result){

    	$.each(result, function(key, element) {
    		var key = key;
    		var element = element;
    		if (key == "id" || "createdAt" || "updatedAt") {
    			console.log("nope")
    		}
    		else {
    		var object = {location:key, value:element}
    		debugger
    		array.push(object)
    		}
			});
    }});

