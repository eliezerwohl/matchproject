var flash = require('connect-flash');
var home = require("../server/controllers/homeController");
var create = require("../server/controllers/createController");
var view = require("../server/controllers/viewController");
var mail = require("../server/controllers/mailController");
var deleteController = require("../server/controllers/deleteController");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcryptjs");
var User = require("../server/models/user")
var cookieParser = require('cookie-parser')
var express = require("express");
var app = express()
app.use(cookieParser())
module.exports = function(app) {
	app.use(require('express-session')({
		secret: 'scroll_buttons',
		resave: true,
		saveUninitialized: true,
		cookie: {
			secure: false,
			maxAge: (4 * 60 * 60 * 1000)
		}
	}));
	app.use(flash());
	var isValidPassword = function(user, password) {
		return bcrypt.compareSync(password, user.password);
	}
	app.use(passport.initialize());
	app.use(passport.session());
	
	passport.use('login', new LocalStrategy({
		passReqToCallback: true
	},
	function(req, username, password, done) {
		User.findOne({
				'username': username
			},
			function(err, user) {

				// In case of any error, return using the done method
				if (err)
					return done(err);
				// Username does not exist, log error & redirect back
				if (!user) {
					console.log("username not found!")
					return done(null, false);
				}
				// User exists but wrong password, log the error
				if (!isValidPassword(user, password)) {

					return done(null, false,
						console.log('Invalid Password'));
				}
				req.session.user = user;
				usernameExport = user;
				console.log("logged in?")
				return done(null, user);
			}
		);
	}));
	passport.serializeUser(function(user, done) {
		done(null, user);
	});
	passport.deserializeUser(function(user, done) {
		done(null, user);
	});

	app.get("/userAccount", home.userAccount)
	app.get("/viewThisUser", view.viewThisUser)
	app.post("/thisUser", view.thisUser)
	app.post("/surveySave", view.surveySave)
	app.get("/deleteSurvey", deleteController.deleteSurvey)
	app.post("/deleteSurveyData", deleteController.deleteSurveyData)
	app.get("/viewAllQuestions", view.viewAllQuestions)
	app.post("/viewInputAnswers", view.viewInputAnswers)
	app.post("/goTo", view.goTo)
	app.get("/viewAllSurveys", view.viewAllSurveys)
	app.post("/createQuestion", create.createQuestion);
	app.get("/previewSurvey", view.previewSurvey);
	app.get("/view", view.viewSurvey);
	app.get("/viewSurvey/:surveyId", function(req, res){
		req.session.fillSurvey = req.params.surveyId
			res.redirect("/")
		// res.send(req.params.surveyId)
	})

	app.get("/", function(req, res) {
		res.sendFile(process.cwd() + "/public/home.html")
	});
	app.get("/userList", view.userList)


	app.post("/surveyId", view.surveyId)
	app.post("/logout", deleteController.logout)
	app.post("/viewAnswersByQuestion", view.viewAnswersByQuestion)
	app.get("/location", home.location)
	app.get("/shareSurvey", create.shareSurvey)
	app.post("/mail", mail.mail)
	app.post("/signUp", home.signUp);
	app.post("/newSurvey", home.newSurvey);
	app.post("/storeData", create.storeData);
	app.post('/login', function(req, res, next) {
		passport.authenticate('login', function(err, user, info) {
			req.session.user.account = user.account;
			if (err) {
				return next(err);
			}
			if (!user) {
				return res.send("error")
			}
			req.logIn(user, function(err) {
				if (err) {
					return next(err);
				}
				debugger
				return res.send(req.session.user.account);
			});
		})(req, res, next);
	});
};