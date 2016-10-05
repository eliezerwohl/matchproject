
	$.ajax({url: "/findChat", success: function(result){
		buttonColor(result);
	}})
