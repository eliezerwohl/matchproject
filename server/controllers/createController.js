var Question = require("../models/question");
var Survey = require("../models/survey");
var Answer = require("../models/answer");

exports.shareSurvey = function(req, res){
//hardcoded for now
	var surveyId = req.session.survey
	var local = global.var
	
	var info = {"local":local, "surveyId": surveyId}
	res.send(info)
}
exports.storeData = function(req, res){
	req.session.fillSurvey = ''
	
	var newAnswer = new Answer({
		_question:req.body.id,
		answer:req.body.value,
		randomId:req.body.randomId
	});

	newAnswer.save(function(err, doc){
	
		if (err){
			console.log (err)
		}
		else{
			
			var questionId= req.body.id
			var answerId = doc._doc._id

			Question.findByIdAndUpdate(questionId, {
				$push: {
					"_answer": answerId
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
			});
		}
	});
	//create new answer, put the question 
	//find the question, push answer into array


}
exports.createQuestion=function(req, res){
	
	var newQuestion = new Question({
		"text": req.body.text,
		"type": req.body.type,
		"_survey": req.session.survey,
		"lines": req.body.lines,
		"options":req.body.options,
	});
	newQuestion.save(function(err, doc) {
		if (err) {
			console.log(err)
		} else {
			
			var surveyId = req.session.survey
			Survey.findByIdAndUpdate(surveyId, {
				$push: {
					"_question": doc._doc._id
				}
			}, {
				safe: true,
				upsert: true
			}, function(err, model) {
				
				console.log("it worked?")
			})
			res.send(doc)
			console.log(doc)
		}
	});
}