var home = require("../controllers/homeController");

module.exports = function(app) {

app.get("/test", function(req,res){
  res.render("qa");
});

app.get("/homeController", home.homeController); 

app.get("/myQuestions", function(req, res){
	res.render("myQuestions");
});

app.get("/", function(req,res){
  res.render("index");
});


}