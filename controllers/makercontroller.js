var models = require("../models/models.js");
var Sequelize = require('sequelize');

var primeResults;
var primeNumber;	

function primeInfo(res, id){
	debugger
		models.Answer.findAll({
		where:{
			UserId:id
		}}).then(function(data){

		 res.send(data)
		});
}

exports.findPrime = function(req, res){
	primeNumber=0;
	primeResults=[];
	var noMatch = [];
	models.MakerFilter.findAll({
		where:{
			UserId:1,
		}
	}).then(function(data){
		for (var i = 0; i < data.length; i++) {
			noMatch.push(data[i].dataValues.matchId)
		}
		}).then(function(){
		//gets a list of the possible primes that the user has said no to
		models.User.findAll({
		where:{
			id:{$notIn: noMatch},
			account:"match"
		},
	  order: [
	    Sequelize.fn( 'RAND' ),
	  ]
		}).then(function(results){
				//stored results in array so don't have to search again
			for (var i = 0; i < results.length; i++) {
				primeResults.push(results[i].dataValues.id);
			}
		}).then(function(){

			primeInfo(res, primeResults[0])
		})
	});
}

exports.nextPrime = function(req, res){
  primeNumber ++;
  primeInfo(res, primeResults[primeNumber]);
}
