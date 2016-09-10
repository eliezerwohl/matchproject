var home = require("../controllers/homeController");

module.exports = function(app) {

app.get("/test", function(req,res){
  res.render("qa");
});

app.get("/homeController", home.homeController); 

app.get("/", function(req,res){
  res.send("test");
});

//sever can go here, much easier 
}