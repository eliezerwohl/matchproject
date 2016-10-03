var express = require('express');
var app = express();
var expressHandlebars = require('express-handlebars'); 
//passport
var passport = require('passport');
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

require('./routes')(app);

var server = app.listen(PORT, function(){
	  console.log("Listening on port %s", PORT);
});


var io = require('socket.io').listen(server);
io.on('connection', function(socket){
  console.log('a user connected');

    socket.on('disconnect', function(){
    console.log('user disconnected');
  });
     socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});



