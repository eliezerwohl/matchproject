var express = require('express');
var app = express();
var compression = require('compression')
app.use(compression())
var expressHandlebars = require('express-handlebars'); 
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}))
var PORT = process.env.PORT || 9000;
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
var hbs = require('express-handlebars').create();
hbs.getPartials().then(function(partials) {
});
var Sequelize = require('sequelize');
app.use(passport.initialize());
var server = app.listen(PORT, function(){
	  console.log("Listening on port %s", PORT);
});
var io = require('socket.io').listen(server, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax : 5000,
    reconnectionAttempts: 99999
});
require('./routes')(app, io);






