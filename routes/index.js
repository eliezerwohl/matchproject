var home = require("../controllers/homeController");
module.exports = function(app) {
	
	app.get("/signUp", function(req,res){
	  res.render("signUp");
	});

	app.post("/signUp", home.signUp);

	app.get("/homeController", home.homeController); 

	app.get("/myQuestions", function(req, res){
		res.render("myQuestions");
	});

	app.get("/", function(req,res){
	  res.render("index");
	});

}