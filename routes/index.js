module.exports = function(app) {

app.get("/test", function(req,res){
  res.render("qa")
}) 

app.get("/", function(req,res){
  res.send("test")
})

//sever can go here, much easier 
}