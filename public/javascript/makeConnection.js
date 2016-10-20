// //make this load on page load
$( document ).ready(function() {
	//fixes sensitivity issue on mobile devices
$.event.special.swipe.scrollSupressionThreshold = (screen.availWidth) / 60;
$.event.special.swipe.horizontalDistanceThreshold = (screen.availWidth) / 60;
$.event.special.swipe.verticalDistanceThreshold = (screen.availHeight) / 13;
	function chatSize (){
    var height = ($(window).height()); 
    $("#chatBox").css("height", height-117 + "px")
  }
  chatSize()
  $(window).resize(chatSize);

	function getPrime(){
		$("#rightText").text("next")
		$(".pull-left").show()
		$(".pull-right").hide()
		$(".main, #buttonControl").off("swiperight")
		$(".main, #buttonControl").off("swiperleft")
		//control
		$(".save").off("click");
		$(".toggle").css("visibility", "hidden")
		$("#left").on("click", function(){
			next();
		});
		$("#right").on("click", function(){
			getMatch();
		});
		$(".main, #buttonControl").on("swiperight",function(event){
			event.stopImmediatePropagation();
	  	getMatch();
		});
		$(".main, #buttonControl").on("swipeleft",function(event){
			event.stopImmediatePropagation();
	  	next();
		});
		$.ajax({url: "/findPrime", success: function(result){;
		 	append(result, "prime");
		}});
	}
	getPrime();
	function next(){
			$.ajax({url: "/nextPrime", success: function(result){
			if (result === false){
				getPrime();
			}
			else{
			 	append(result, "prime");
			 }
		}});
	}

//get match
	function getMatch(){
		$(".main, #buttonControl").off("swiperight")
		$(".main, #buttonControl").off("swiperleft")
		$(".main, #buttonControl").on("swiperight",function(event){event.stopImmediatePropagation();save(1)});
		$(".main, #buttonControl").on("swipeleft",function(event){event.stopImmediatePropagation();save(0)});
		$(".pull-left").hide();
		$(".pull-right").show();
		$("#left, #right").off("click")
		$("#rightText").text("no")
		$(".toggle").css("visibility", "visible")
		$(".save").on("click", function(){
		var data =(this).value;
		save(data);
		});
		$.ajax({url: "/getMatch", success: function(result){
			if (result === false){
				//you've matched everybody
				$("#warningModal").modal("show");
				getPrime();
			}
			else{append(result, "match");}
		}});
	}

	function nextMatch(){
		$.ajax({url: "/nextMatch", success: function(result){
			if (result === false){
				getPrime()
				$("#warningModal").modal("show")
			}
			else{
		 		append(result, "match");
		 	}
		}});
	}

	function save(data){
		$.ajax({url: "/saveMatch", type:"POST", data:{data:data}, success: function(result){
			nextMatch();
		}});
	}

	$(".toggle").on("click", function(){
		$(".pull-left, .pull-right").toggle();
	});
});


