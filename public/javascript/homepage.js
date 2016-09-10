// navbar items
$("#contact").on("click", function(e){
    e.preventDefault()
  $(".modalTitle, .modalBody, .modalFooter").empty();
  $(".modal").modal();
  $(".modalTitle").append("Contact Us");
  $(".modalBody").append("coming soon");
  $(".modalFooter").append('<button type="submit" id="endModal" data-dismiss="modal" class="col-lg-12 col-xs-12 btn btn-lg btn-primary pull-left"><span class="glyphicon glyphicon-arrow-left"> </span>BACK</button>');
});

$("#about").on("click", function(e){
    e.preventDefault()
  $(".modalTitle, .modalBody, .modalFooter").empty();
  $(".modal").modal();
  $(".modalTitle").append("About Miriam's Memories");
  $(".modalBody").append("coming soon");
  $(".modalFooter").append('<button type="submit" id="endModal" data-dismiss="modal" class="col-lg-12 col-xs-12 btn btn-lg btn-primary pull-left"><span class="glyphicon glyphicon-arrow-left"> </span>BACK</button>');
});
