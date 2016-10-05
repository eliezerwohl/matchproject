var home = require("../controllers/homeController");
var chat = require("../controllers/chatController");
var match = require("../controllers/matchController");
var save = require("../controllers/saveController");
var userSave = require("../controllers/userSaveController");
var maker = require("../controllers/makerController");
var userMatch = require("../controllers/userMatchController");
var express = require('express');
var app = express();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcryptjs");
var models = require("../models/models.js");
var sharedsession = require("express-socket.io-session");

module.exports = function(app, ioInstance) {
  var io = ioInstance;
  var sock;
  var session = require("express-session")({
      secret: "my-secret",
      resave: true,
      saveUninitialized: true
  });
  app.use(session); 
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
    }).then(function(user) {
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
  io.use(sharedsession(session, {
    autoSave:true
  })); 
   io.on('connection', function(socket){
    sock = socket
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
    socket.on('room', function(room) {
      socket.join(socket.handshake.session.chatId);
    });
    socket.on('chat message', function(msg){
      chat.save(msg, sock)
      io.to(socket.handshake.session.chatId).emit('chat message', msg);
    });
  });
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
  app.get("/nextMatch", maker.nextMatch);
  app.get("/getMatch", maker.getMatch);
  app.get("/makerhome", function(req, res){
    res.render("makerhome");
  });
  app.get("/currentStatus", match.currentStatus);
  app.get("/nextMatch", maker.nextMatch);
  app.get("/matchhome", function(req, res){
    res.render("matchhome")
  })
  app.post("/userSave", userSave.userSave);
  app.get("/myMatch", function(req, res) {
    res.render("myMatch")
  })
  app.get("/userMatch", userMatch.userMatch)
  app.post("/saveMatch", save.saveMatch);
  app.get("/nextPrime", maker.nextPrime);
  app.post("/myQuestions", match.myQuestions);
  app.get("/findPrime", maker.findPrime);
  app.get("/chat", function(req,res){
    res.render("chat");
  });
  app.get("/chatHome", function(req, res){
    res.render("chatHome")
  });
  app.post("/chatId", chat.chatId)
  app.get("/chatHistory", chat.chatHistory)
  app.get("/findChat", chat.findChat);
	app.get("/", function(req,res){
	  res.render("index");
	});
}