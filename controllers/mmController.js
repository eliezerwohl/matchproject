var express = require('express');
var app = express();
var router = express.Router();
var Sequelize = require('sequelize');
var connection = new Sequelize('MMUsersDB', 'root');

var User = connection.define('User', {
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  password: Sequelize.STRING,
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING
}); 


router.get('/', function(req,res) {

  res.render("index");
});

router.get('/signUp', function(req,res) {
  res.render("signUP");
});

router.get('/loggedIn', function(req,res) {
  res.render("loggedIn");
});

router.post('/logIn', function(req,res) {
var checkUser = function(username, password){
  User.findOne({
    where: {
      email: username,
      password:password 
    }
  }).then(function(results){
    if(results){
        console.log("Successfully logged in!");
        res.redirect("/loggedIn")
      } else {
        console.log("Your login credentials do not work");
        res.redirect("/")
      }
   }); 
}

var email= req.body.email ;
var password = req.body.password;
  checkUser(email, password)
});

router.post('/register', function(req,res) {
  console.log(req.body.email)
    User.create({
            email: req.body.email,
            password: req.body.password,
            firstname:req.body.firstname,
            lastname:req.body.lastname
          }).then(function() {
            console.log("SAVED!");
          });

  res.redirect("/");
});


module.exports = router;