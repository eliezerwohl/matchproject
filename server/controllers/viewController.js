var Question = require("../models/question");
var Survey = require("../models/survey");
var Answer = require("../models/answer");

exports.viewInputAnswers = function(req, res){
	
}


exports.viewThisUser = function(req, res){
	res.send(req.session.userId)
}
exports.thisUser = function(req, res){

	req.session.userId = req.body.id 
	res.send("got it")

}

exports.userList = function(req, res){
	Survey.find({"_id":req.session.surveyId})
	.exec(function(err, docs){
		if (err){
			res.send(err)
		}
		else{
			res.send(docs[0]._doc._randomId)
		}
	})

}

exports.surveySave = function(req, res){
			var questionId= req.body.id
			var surveyId = req.body.surveyId

			Survey.findByIdAndUpdate(surveyId, {
				$push: {
					"_randomId": {
						id:req.body.randomId
					}
				}
			}, {
				safe: true,
				upsert: true
			}, function(err, model) {

				if (err){
					res.send(err)
				}
				else{
					res.send(model)
				}
			})
}

exports.surveyId = function(req, res){
	debugger
	req.session.surveyId =req.body.id
	res.send("got it")
}

exports.viewAnswersByQuestion = function(req, res){
	
	Answer.find({"_question":req.body.id})
	.exec(function(err, docs){
		if (err){
			res.send(err)
		}
		else{
			res.send(docs)
		}
	})

}
exports.viewAllQuestions = function(req, res){
	Question.find({"_survey":req.session.surveyId})
	.populate("_answer")
	.exec(function(err, docs){
		
		if (err){
			res.send(err)
		}
		else{
			res.send(docs)
		}
	})
}

exports.goTo = function(req, res){
	
	req.session.surveyId = req.body.id
	res.send('got it')
}

exports.viewAllSurveys = function(req, res){
	Survey.find({"_user":req.session.user._id})
	.exec(function(err, docs){
		if (err){
			console.log(err)
		}
		else{
			res.send(docs)
		}
	})
}
exports.viewSurvey = function(req, res){
	req.session.fillSurvey
		//hard coding survey number so I can figure out how to render it, will
	//put req.session.whatever in later
	Question.find({"_survey":"572f7dbac823801140e12e95"})
	.exec(function(err, docs){
		if (err){
			console.log (err)
		}
		else{
			res.send(docs)
		}
	});

}
exports.previewSurvey = function(req, res){
	//hard coding survey number so I can figure out how to render it, will
	//put req.session.whatever in later
	Survey.find({"_id":req.session.fillSurvey})
	.populate("_question")
	.exec(function(err, docs){
		if (err){
			console.log (err)
		}
		else{
			
			res.send(docs)
		}
	});
}