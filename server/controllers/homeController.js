var User = require("../models/user");
var Survey = require("../models/survey");
var bcrypt =require("bcryptjs");

//if user refreshes page, this get request will identify what type of account they have
exports.userAccount = function (req, res){
	res.send(req.session.user.account);
}
function saltyhash(pass) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(pass, salt);
  return hash;
}
exports.newSurvey = function(req, res){
	//create new survey, put user id in it req.session.user._id
	var newSurvey = new Survey({"_user":req.session.user._id, "name":req.body.name, "randomId":req.body.id});
	newSurvey.save(function (err, doc) {
		if (err){
			console.log(err)
		}
		else{
			req.session.survey = doc._doc._id
			res.send(doc)
			console.log(doc)
		}
	});
}
exports.location = function (req, res){
	res.send(req.session.fillSurvey)
	}
exports.signUp = function (req, res){
	User.findOne({"username":req.body.email}).exec(function(err, result){
		if(result != null){
			res.send("taken")
		}
		else{
			var newUser = new User({"username":req.body.email,
														"firstName":req.body.firstName,
														"lastName":req.body.lastName,
														"city":req.body.city,
														"account":req.body.account,
														"password":saltyhash(req.body.password)});
			newUser.save(function (err, doc) {
				if (err){
					console.log(err)
				}
				else{
					res.send(doc)
				}
			});
		}
	})
}