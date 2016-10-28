var home = require("../controllers/homeController");
var chat = require("../controllers/chatController");
var myProfile = require("../controllers/myProfileController");
var update = require("../controllers/updateController");
var save = require("../controllers/saveController");
var userSave = require("../controllers/userSaveController");
var make = require("../controllers/makeConnectionController");
var userMatch = require("../controllers/userMatchController");
var express = require('express');
var app = express();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcryptjs");
var models = require("../models/models.js");
var sharedsession = require("express-socket.io-session");
var cookieSession = require('cookie-session')
function isAuthenticated(req, res, next) {
  if (req.user)
    return next();
  res.redirect('/');
}

module.exports = function(app, ioInstance) {
  var io = ioInstance;
  var sock;
  app.set('trust proxy', 1) // trust first proxy 
   session = require("cookie-session")({
  name: 'session',
  keys: ['key1', 'key2']
  })
  app.use(session)
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
    function callback(data, socket){
      socket.handshake.session[data] = data;
    }
  io.on('connection', function(socket){
    socket.leave(socket.handshake.session.chatId);
    sock = socket
    models.Online.update({
      online:1
    },{
      where:{
        id:socket.handshake.session.UserId
      }
    })
    console.log('a user connected');
    socket.on('disconnect', function(){
      models.Online.update({online:0},
        {where:{id:socket.handshake.session.UserId}
      });
      console.log('user disconnected');
    });
    socket.on("notify", function(){
      update.checkedNotify(sock, io)
    });
    socket.on("online", function(data){
      socket.handshake.session.dataArray = data
      update.online(socket, io, data)
    })
    socket.on("login", function(location){
      update.score(sock, io);
      update.notifyConnect(sock, io);
      update.newMessage(sock, io, location);
    });
    socket.on('room', function(room) {
      io.to(socket.id).emit('message', socket.id.substring(2, 15));
      socket.join(socket.handshake.session.chatId);
      // if (io.sockets.adapter.rooms[socket.handshake.session.chatId].length > 1){
        models.Message.update({
          checked:1
        },{
          where:{MatchedId:socket.handshake.session.chatId}
        });
      // }
    });
    socket.on('chat message', function(msg){
      chat.save(msg, socket, socket.adapter.rooms[socket.handshake.session.chatId].length)
      var message = {msg:msg, id:socket.id.substring(2, 15)}
      io.to(socket.handshake.session.chatId).emit('chat message', message);
    });
  });
	app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/loggedin',
    failureRedirect: '/?incorrect'
  }));
  app.get("/settings", isAuthenticated, function(req, res){res.render("settings");})
  app.get("/logout", function(req, res){req.session = null;res.redirect("/");});
  app.get("/loginData", home.loginData);
	app.get("/loggedin", isAuthenticated, home.loggedin);
	app.get("/signUp", function(req,res){res.render("signUp", {layout:"mainFront"});});
  app.get("/updateStatus", myProfile.updateStatus);
  app.get("/currentStatus", myProfile.currentStatus);
  app.get("/myQuestions", isAuthenticated, function(req, res){res.render("myQuestions");});
  app.get("/myInfo", isAuthenticated, function(req, res){res.render("myInfo");});
  app.post("/myInfoUpdate", myProfile.myInfoUpdate);
  app.post("/myQuestionsUpdate", myProfile.myQuestions);
  app.get("/myInfoData", myProfile.myInfo);
  app.get("/myQuestionsData", myProfile.myQuestionsData);
	app.post("/signUp", home.signUp);
	app.get("/myProfile", isAuthenticated, function(req, res){res.render("myProfile");});
  app.get("/nextMatch", make.nextMatch);
  app.get("/getMatch", make.getMatch);
  app.get("/makeConnection", isAuthenticated, function(req, res){res.render("makeConnection");});
  app.get("/nextMatch", make.nextMatch);
  app.get("/nextPrime", make.nextPrime);
  app.get("/findPrime", make.findPrime);
  app.get("/matchhome", function(req, res){res.render("matchhome");})
  app.post("/userSave", userSave.userSave);
  app.get("/myMatch", isAuthenticated, function(req, res) {res.render("myMatch");})
  app.get("/userMatch", isAuthenticated, userMatch.userMatch)
  app.post("/saveMatch", save.saveMatch);
  app.get("/chat", isAuthenticated, function(req,res){res.render("chat");});
  app.get("/chatHome",isAuthenticated, function(req, res){res.render("chatHome");});
  app.get("/homecheck", home.homecheck);
  app.get("/chatName", chat.chatName);
  app.post("/chatId", chat.chatId)
  app.get("/chatHistory", chat.chatHistory)
  app.get("/findChat", chat.findChat);
	app.get("/", function(req,res){res.render("index", {layout: "mainFront"});});
}