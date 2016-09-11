var express = require('express');
var app = express();
var expressHandlebars = require('express-handlebars'); 
//passport
var passport = require('passport');
var session = require('express-session');
//bcrypt
var bcrypt = require("bcryptjs");
//bodyParser
// require("dotenv").config();
var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}))
var session = require('express-session');
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
// if (process.env.NODE_ENV === 'production') {
//   // HEROKU DB
//   console.log(process.env.JAWSDB_URL);

//   var connection = new Sequelize(process.env.JAWSDB_URL);
// } else {
//   // LOCAL DB
//   var connection = new Sequelize('match', 'root', 'samusaran');
// }
// var models = require("./models/models.js");
// app.use(express.static('public'));
// app.use(require('express-session')({
//   secret: "dexterslab",
//   resave: true,
//   saveUninitialized: true,
//   cookie: {
//     secure: false,
//     maxAge: (1000 * 60 * 60 * 24 * 30)
//   },
// }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({
  extended: false
}));
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
              //if password is correct authenticate the user with cookie
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
//bcrypt define
// function saltyhash(pass) {
//   var salt = bcrypt.genSaltSync(10);
//   console.log(salt);
//   var hash = bcrypt.hashSync(pass, salt);
//   return hash;
// }

// function isAuth(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect("/?msg=no_authorization");
// }

// app.get('/', function(req, res) {
//   res.render("index", {
//     msg: req.query.msg,
//     layout: "mainpage.handlebars"
//   });
// });

// // register user
// app.get('/register', function(req, res) {
//   res.render("signUp", {
//     msg: req.query.msg,
//     layout: "mainpage.handlebars"
//   });
// });

// app.get("/admin", function(req, res){
//   res.render("admin")
// });

// app.get("/adminCreate", function(req, res){
//   res.render("adminCreate")
// });

// app.post('/adminCreate', function(req, res) { 
//   models.User.findOne({
//     where: {
//       email: req.body.email
//     }
//   }).then(function(results) {
//     if (results) {
//       res.redirect("/adminCreate?msg=Your email is already registered, please login.");
//     } else {
//       models.User.create({
//         lastname: (req.body.lastname).trim(),
//         firstname:  (req.body.firstname).trim(),
//         email: req.body.email,
//         password: saltyhash(req.body.password),
//         phone:req.body.phone,
//         OrganizationId:req.session.OrganizationId,
//         admin:false 
//       }).then(function() {
//         res.redirect("/admin?msg=You have created a new user!");
//       });
//     }
//   });
// });

// app.get('/loggedin', isAuth, function(req, res) {

//   models.User.findAll({
//     where: [{
//       email: req.user.username
//     }]
//   }).then(function(User) {
//     req.session.OrganizationId = User[0].dataValues.OrganizationId;
//     req.session.firstname = User[0].dataValues.firstname;
//     req.session.lastname = User[0].dataValues.lastname;
//     req.session.UserId= User[0].dataValues.id;
//     req.session.Admin  = User[0].dataValues.admin;
    
//     console.log(req.session.Admin)
//      if (req.session.Admin==true){
//     res.render("admin");
//   }
//     else{
//     res.render("loggedIn")}
//     });
//   });


// app.post('/login',
//   passport.authenticate('local', {
//     successRedirect: '/loggedin?msg=Login successful.',
//     failureRedirect: '/?msg=Login unsuccessful, please check your email and password or if you haven\'t done so, please register.'
//   }));

// app.post('/register', function(req, res) { 
//  models.Organization.create({
//     name: req.body.name
//   }).then(function(data) { 
//     console.log(data)
//     var orgId = data.dataValues.id
//   models.User.findOne({
//     where: {
//       email: req.body.email
//     }
//   }).then(function(results) {
//     if (results) {
//       res.redirect("/register?msg=Your email is already registered, please login.");
//     } else {
//       models.User.create({
//         lastname: (req.body.lastname).trim(),
//         firstname:  (req.body.firstname).trim(),
//         email: req.body.email,
//         password: saltyhash(req.body.password),
//         phone:req.body.phone,
//         OrganizationId:orgId,
//         admin: true
//       }).then(function() {
//         res.redirect("/?msg=Thanks for registering, please login.");
//       });
//     }
//   })
// });
// })
// app.get('/patientregister', isAuth, function(req, res) {
//     res.render("patientregister")
//   });

// app.post('/patientregister', isAuth, function(req, res) {
//   models.Patient.create({
//     lastname: req.body.lastname,
//     firstname: req.body.firstname,
//     dob:req.body.dob,
//     phone:req.body.phone,
//     email:req.body.email,
//     address1:req.body.address1,
//     address2:req.body.address2,
//     UserId: req.session.UserId,
//     OrganizationId:req.session.OrganizationId
//   }).then(function(data) {
//     req.session.PatientId = data.dataValues.id;
//     res.redirect("patientquestion/1");
//   })
// })

// app.get("/patientquestion/:number", isAuth, function(req, res) {
//   var number= req.params.number;
//   models.BulkQuestion.findAndCountAll().then(function(result){
//     //automatically send the user to the create a question page after all the premade
//     //questions have been answered
//     if (number > result.count){
//       res.redirect("/patientQuestionComplete")
//     }
//     else{
//        models.BulkQuestion.findAll({
//         where: [{
//         id: number
//         }]
//       }).then(function(question) {
//         res.render("questionPage", {number:number, question:question[0].dataValues.question})
//       });
//     }
//   })
// });
// app.post("/patientquestion/:question/", isAuth, function(req, res) {
//   var nextPage = parseInt(req.params.question) + 1;
//   models.Question.create({
//     question: req.body.question,
//     answer: req.body.answer,
//     PatientId: req.session.PatientId,
//     OrganizationId:req.session.OrganizationId,
//     UserId:req.session.UserId
//   }).then(function(data) {
//     res.redirect("/patientquestion/" + nextPage + "/");
//   })
// })
// app.get("/patientQuestionComplete", function(req, res){
//   res.render("patientQuestionComplete")
// });
// app.get("/questionCreate", function(req, res){
//   res.render("questionCreate")
// });

// app.post("/questionCreate", function(req, res){
//   models.Question.create({
//     question: req.body.question,
//     answer: req.body.answer,
//     PatientId: req.session.PatientId,
//     UserId:req.session.UserId,
//     OrganizationId:req.session.OrganizationId 
//   }).then(function(data) {
//   res.redirect("/patientQuestionComplete")
//   })
// });

// app.get("/showAll", function(req, res){
//   models.Patient.findAll({
//       order: [
//     ['lastname', 'ASC']],
//       where:[{
//         OrganizationId:req.session.OrganizationId
//       }]
//     }).then(function(results){
//       res.render("showAll", {results:results})
//     });
//    })

// app.get("/view/:patientId", function(req, res){
// req.session.PatientId = req.params.patientId;
// console.log(req.session.PatientId)
// models.Patient.findAll({
//     where: [{
//       // using both userid and id to prevent user from rendering a patient that doesn't belong to them
//       OrganizationId: req.session.OrganizationId,
//       id:req.session.PatientId
//     }]
//   }).then(function(results) {
//     res.render("patientInfo", {results:results})
//   })
// });

// app.get("/patientQa", function(req, res){
// models.Question.findAll({
//     where: [{
//       PatientId: req.session.PatientId,
//     }]
//   }).then(function(results) {
//     console.log(results)
//     res.render("qa", {results:results})
//   })
// });

// app.get("/viewNote/:questionId", function (req, res) {
//   req.session.QuestionId = req.params.questionId;
//   models.Question.findAll({
//     include: [
//       {model: models.Note}
//       ],
//     where: [{
//       id: req.session.QuestionId,
//       // using the id so that user can't access a question not linked to thier user
//       OrganizationId:req.session.OrganizationId
//     }]
//   }).then(function(results){
//     debugger
//     console.log(results)
//     res.render("questionInfo", {results:results})
//     })
// })

// app.post("/createNote", function (req, res){
//   models.Note.create({
//     QuestionId: req.session.QuestionId,
//     note: req.body.note,
//     UserId:req.session.UserId,
//     OrganizationId:req.session.OrganizationId,
//     firstname:req.session.firstname,
//     lastname:req.session.lastname
//   }).then(function(data) {
//     res.redirect("back")
//   });
// });

// app.get("/back", function(req, res){
//   res.redirect("view/"+req.session.PatientId)
// })
// // javascript split charAt[9]
// // look at npm moment convert utc
// app.get('/logout', function (req, res){
//   req.logOut();
//   req.session.destroy(function (err) {
//   res.redirect('/'); 
//   });
// });

// app.get("/search", function(req, res){
//   res.render("search")
// });

// app.post("/search", function(req, res){
//  req.session.search = "%" + req.body.search + "%"
//  res.redirect("/searchResults");
// });

// app.get("/searchResults", function(req, res){
//  models.Patient.findAll({
//     order: [
//     ['lastname', 'ASC']],
//     where: [{
//       OrganizationId: req.session.OrganizationId,
//      $or: [{firstname: {$like:req.session.search}}, {lastname: {$like: req.session.search}}]
//     }]
//   }).then(function(results) {
//   res.render("searchResults", {results:results})
//  });
// })

// app.get("/test", function(req,res){
//   res.render("test")
// })

require('./routes')(app);



// var User = connection.define('User', {
//   email: {
//     type: Sequelize.STRING,
//     unique: true
//   },
//   password: Sequelize.STRING,
//   firstname: Sequelize.STRING,
//   lastname: Sequelize.STRING,
// });

var models = require("./models/models.js");
console.log(models.User)


// connection.sync()
app.listen(PORT, function() {
  console.log("Listening on port %s", PORT);
})