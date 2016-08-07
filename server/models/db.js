// require("./user");
// require("dotenv").config();
var mongoose = require("mongoose");
if(process.env.NODE_ENV === 'production') {
  // HEROKU DB
  mongoose.connect(process.env.MONGOLAB_URI);
}
else {
  // LOCAL DB
  var dbURI = 'mongodb://localhost/survey';
  mongoose.connect(dbURI);
}

mongoose.connection.on("connected", function() {
	console.log("mongoose connected to " + dbURI);
});


mongoose.connection.on("error", function() {
	console.log("mongoose connection err ");
});

mongoose.connection.on("disconnected", function() {
	console.log("mongoose disconnected");
});