var models = require("../models/models.js");
var Sequelize = require('sequelize');
var resultsArray;
var currentNumber;
var currentPrime;	
var noMatch;
//need to make sure that prime's age is within what the match wants
function dataStore(res, req, data, prime){
	for (var i = 0; i < data.length; i++) {
		resultsArray.push(data[i].dataValues);
	}
	if (prime===true){
		currentPrime = resultsArray[0];
	}
	else {
		req.session.matchedArray = [currentPrime.id, resultsArray[0].id]
	}
	res.send(resultsArray[currentNumber].Answers[0].dataValues)
}


function next(res, req, prime){
	currentNumber ++;
		if (currentNumber === resultsArray.length) {
			res.send(false);
		}
		else {
			if (prime === true){
				currentPrime = resultsArray[currentNumber];
			}
			else{
				req.session.matchedArray = [currentPrime.id, resultsArray[currentNumber].id]
			}
		res.send(resultsArray[currentNumber].Answers[0].dataValues);
	}
}

exports.getMatch=function(req, res){
	currentNumber=0;
	noMatch = [req.session.UserId, currentPrime.id];
	resultsArray=[]
	models.Vote.findAll({
		where:{
			UserId:req.session.UserId
		},
		include: [{
		where: { UserId: Sequelize.col('User.id') },
    model: models.Matched,
        where: { MatchedId: Sequelize.col('Matched.id') },
      }]
	}).then(function (data){
		if (data.length < 1) {
			return true
		}
		else {
			for (var i = 0; i < data.length; i++) {
				if (data[i].Matched.dataValues.user1 == currentPrime.id  ){
						noMatch.push(data[i].Matched.dataValues.user2)
				}
				else if  (data[i].Matched.dataValues.user2 == currentPrime.id  ){
					noMatch.push(data[i].Matched.dataValues.user1)
				}
			}
		}
		
	
	}).then(function(){
		models.User.findAll({
	where:{
		id:{$notIn: noMatch},
		match:1,
		city:currentPrime.city,
		//gender must be seeking, seeking must be gender
		age:{ $between: [	currentPrime.lower, 	currentPrime.upper] } ,
		lower:{$lte: currentPrime.age},
		upper:{$gte: currentPrime.age},
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
		if (results.length === 0){
			res.send(false);
		}
		else{
		dataStore(res, req, results, false);
		}
	});

	});

		//terrible fix for searchign for both.  will have to redo how data is entered
		// if(currentPrime.seeking === "both"){
		// 	currentPrime.seeking = [m, f]
		// 
}

exports.findPrime = function(req, res){
	currentNumber=0;
	resultsArray=[];
	noMatch = [req.session.UserId];
	//make a find?  find one?
	//gets a list of the possible primes that the user has said no to
		models.User.findAll({
		where:{
			id:{$notIn: noMatch},
			match:1,
		},
		attributes: ['id', 'city', "upper", "lower", "age", "seeking", "gender"],
		include: [{
    model: models.Answer,
        where: { UserId: Sequelize.col('User.id') },
   			attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'UserId'] },
    }],
	  order: [
	    Sequelize.fn( 'RAND' ),
	  ]
		}).then(function(results){
				dataStore(res, req, results, true)
		});
}
exports.nextPrime = function(req, res){
		next(res, req, true)
}

exports.nextMatch = function(req, res){
		next(res, req, false)
}

