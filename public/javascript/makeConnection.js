// //make this load on page load
$( document ).ready(function() {
$("#closeModal").on("click", function(){
	$("#warningModal").modal("hide");getPrime();
});
	//fixes sensitivity issue on mobile devices
$.event.special.swipe.scrollSupressionThreshold = (screen.availWidth) / 60;
$.event.special.swipe.horizontalDistanceThreshold = (screen.availWidth) / 60;
$.event.special.swipe.verticalDistanceThreshold = (screen.availHeight) / 13;
	function chatSize (){var height = ($(window).height()); $("#chatBox").css("height", height-117 + "px");}
  chatSize();$(window).resize(chatSize);
	function getPrime(){
		$("#rightText").text("next");
		$(".pull-left").show();
		$(".pull-right").hide();
		$(".main, #buttonControl").off("swiperight");
		$(".main, #buttonControl").off("swipeleft");
		$(".save").off("click");
		$(".toggle").css("visibility", "hidden");
		$("#left").on("click", function(){next();});
		$("#right").on("click", function(){getMatch();});
		$(".main, #buttonControl").on("swiperight",function(event){event.stopImmediatePropagation();getMatch();});
		$(".main, #buttonControl").on("swipeleft",function(event){event.stopImmediatePropagation();next();});
		$.ajax({url: "/findPrime", success: function(result){append(result, "prime");}});
	}
	getPrime();
	function next(){
		$.ajax({url: "/findPrime", success: function(result){append(result, "prime");
		}});
	}
	function getMatch(){
		$(".main, #buttonControl").off("swiperight");
		$(".main, #buttonControl").off("swipeleft");
		$(".main, #buttonControl").on("swiperight",function(event){event.stopImmediatePropagation();save(1)});
		$(".main, #buttonControl").on("swipeleft",function(event){event.stopImmediatePropagation();save(0)});
		$(".pull-left").hide();$(".pull-right").show();
		$("#left, #right").off("click");
		$("#rightText").text("no");
		$(".save").on("click", function(){
		var data =(this).value;
		save(data);
		});
		$.ajax({url: "/getMatch", success: function(result){
			if (result === false){
				//you've matched everybody
				$(".main, #buttonControl").off("swiperight");
				$(".main, #buttonControl").off("swipeleft");
				$("#warningModal").modal("show");
			}
			else{append(result, "match");$(".toggle").css("visibility", "visible");}
		}});
	}

	function nextMatch(){
		$.ajax({url: "/nextMatch", success: function(result){
			debugger
			if (result === false){
				$(".main, #buttonControl").off("swiperight");
				$(".main, #buttonControl").off("swipeleft");
				$("#warningModal").modal("show");
			}
			else{append(result, "match");}
		}});
	}
	function save(data){$.ajax({url: "/saveMatch", type:"POST", data:{data:data}, success: function(result){nextMatch();}});}
	$(".toggle").on("click", function(){$(".pull-left, .pull-right").toggle();});
});
