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
  console.log(partials);
});

var Sequelize = require('sequelize');
app.use(passport.initialize());

require('./routes')(app);

app.listen(PORT, function() {
  console.log("Listening on port %s", PORT);
});