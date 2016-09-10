// function questionSubmit(){
// 	// debugger
// 	//    var answer = $("#answer").val(e)
// 	// if (answer = "d" ){
// 	// 	 e.preventDefault();

// 	// }
// 	// else{
// 	// 	console.log("hit it")
// 	// }
//     var name =$(".question").text()
//         $("#question").val(name);
//  //   console.log(answer)

// }
$("#createQuestion").submit(function(event){
	var answer = $("#answer").val()
	var question = $("#question").val()
  if (answer.length  > 1 && question.length >1 ) {
    // var name =$(".question").text()
    // $("#question").val(name);
    return;
  }
  $("#warning").show()
  event.preventDefault();
})

$( "#notes" ).submit(function( event ) {
	debugger
	var newNote = $("#newNote").val()
  if (newNote.length  > 1 ) {
    return;
  }
  $("#warning").show()
  event.preventDefault();
})

$( "#qa" ).submit(function( event ) {
	var answer = $("#answer").val()
  if (answer.length  > 1 ) {
    var name =$(".question").text()
    $("#question").val(name);
    return;
  }
  $("#warning").show()
  event.preventDefault();
})