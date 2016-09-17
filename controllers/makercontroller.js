var models = require("../models/models.js");
var Sequelize = require('sequelize');
var resultsArray;
var currentNumber;
var currentPrime;	
var noMatch;

function dataStore(res, data, prime){
	for (var i = 0; i < data.length; i++) {
		debugger
		if (noMatch.indexOf(data[i].dataValues.id) === -1) {
			resultsArray.push(data[i].dataValues);
		}
		else{
			return true
		}
	}
	if (prime===true){
		currentPrime = resultsArray[0];
	}
	debugger
	res.send(resultsArray[currentNumber].Answers[0].dataValues)
}


function next(res, prime){
	currentNumber ++;
		if (prime === true){
			currentPrime = resultsArray[currentNumber];
		}
	res.send(resultsArray[currentNumber].Answers[0].dataValues);
}

exports.getMatch=function(req, res){
		currentNumber=0;
	noMatch = [req.session.UserId, currentPrime.id];
	resultsArray=[]

		//terrible fix for searchign for both.  will have to redo how data is entered
		// if(currentPrime.seeking === "both"){
		// 	currentPrime.seeking = [m, f]
		// }
	models.User.findAll({
	where:{
		id:{$notIn: noMatch},
		match:1,
		city:currentPrime.city,
		//gender must be seeking, seeking must be gender
		age:{ $between: [	currentPrime.lower, 	currentPrime.upper] } ,
		gender: currentPrime.seeking,
		seeking:currentPrime.gender,
	},
	include: [{
    model: models.Answer,
        where: { UserId: Sequelize.col('User.id') },
   			attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'UserId'] },
    }],
  order: [
    Sequelize.fn( 'RAND' ),
  ]
	}).then(function(results){
		dataStore(res, results, false)
	});
}

exports.findPrime = function(req, res){
	currentNumber=0;
	resultsArray=[];
	noMatch = [0,req.session.UserId];
	//make a find?  find one?
	models.MakerFilter.findAll({
		where:{
			//after testing make this req.session.UserId
			UserId:req.session.UserId,
		}
	}).then(function(data){
		//need to make another query, if are already matched
		//also need to the person's own id so they aren't matched with themselves
		for (var i = 0; i < data.length; i++) {
			noMatch.push(data[i].dataValues.matchId)
		}
		}).then(function(){
		//gets a list of the possible primes that the user has said no to
		models.User.findAll({
		where:{
			id:{$notIn: noMatch},
			match:1,
		},
		attributes: ['id', 'city', "upper", "lower", "seeking", "gender"],
		include: [{
    model: models.Answer,
        where: { UserId: Sequelize.col('User.id') },
   			attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'UserId'] },
    }],
	  order: [
	    Sequelize.fn( 'RAND' ),
	  ]
		}).then(function(results){
				dataStore(res, results, true)
		});
	});
}


exports.nextPrime = function(req, res){
		next(res, true)
}

exports.nextMatch = function(req, res){
		next(res, false)
}

