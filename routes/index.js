var home = require("../controllers/homeController");
var express = require('express');
var app = express();
var bcrypt = require("bcryptjs");
var models = require("../models/models.js");
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
app.use(require('express-session')({
  secret: "dexterslab",
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: (1000 * 60 * 60 * 24 * 30)
  },
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  done(null, {
    id: id,
    username: id
  })
});
passport.use('local', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email',
    passwordField: "password"
  },
  function(req, email, password, done) {
    models.User.findOne({
        where: {
          email: email
        }
      })
      .then(function(user) {
        if (user) {
          bcrypt.compare(password, user.dataValues.password, function(err, user) {
            if (user) {
              console.log(user);
              done(null, {
                id: email,
                username: email
              });
            } else {
              done(null, null);
            }
          });
        } else {
          done(null, null);
        }
      });
  }));

module.exports = function(app) {
	app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/loggedin?msg=Login successful.',
    failureRedirect: '/?msg=Login unsuccessful, please check your email and password or if you haven\'t done so, please register.'
  }));

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