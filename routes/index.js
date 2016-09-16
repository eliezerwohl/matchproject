var home = require("../controllers/homeController");
var match = require("../controllers/matchController");
var maker = require("../controllers/makerController");
var express = require('express');
var app = express();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcryptjs");
var models = require("../models/models.js");
var session = require('express-session');
module.exports = function(app) {
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
        where: {email: email}
      })
      .then(function(user) {
        if (user) {
          bcrypt.compare(password, user.dataValues.password, function(err, user) {
            if (user) {
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
	app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/loggedin?msg=Login successful.',
    failureRedirect: '/?msg=Login unsuccessful, please check your email and password or if you haven\'t done so, please register.'
  }));
	app.get("/loggedin", home.loggedin);
	app.get("/signUp", function(req,res){
	  res.render("signUp");
	});
    app.get("/updateStatus", match.updateStatus);
  app.get("/myInfo", match.myInfo);
	app.post("/signUp", home.signUp);
	app.get("/myQuestions", function(req, res){
		res.render("myQuestions");
	});
  app.get("/getMatch", maker.getMatch);
  app.get("/makerhome", function(req, res){
    res.render("makerhome");
  });
  app.get("/currentStatus", match.currentStatus);
  app.get("/matchhome", function(req, res){
    res.render("matchhome")
  })
  app.get("/nextPrime", maker.nextPrime);
  app.post("/myQuestions", match.myQuestions);
  app.get("/findPrime", maker.findPrime);
	app.get("/", function(req,res){
	  res.render("index");
	});
}