var models = require("../models/models.js");
var Sequelize = require('sequelize');
//need to make sure that prime's age is within what the match wants
function dataStore(res, req, data, prime){
	for (var i = 0; i < data.length; i++) {
		req.session.resultsArray.push(data[i].dataValues);
	}
	if (prime===true){
		req.session.currentPrime = req.session.resultsArray[0];
	}
	else {
		req.session.matchedArray = [req.session.currentPrime.id, req.session.resultsArray[0].id]
	}
	res.send(req.session.resultsArray[req.session.currentNumber].Answers[0]);
}

function next(res, req, prime){
	req.session.currentNumber ++;
		if (req.session.currentNumber === req.session.resultsArray.length) {
			res.send(false);
		}
		else {
			if (prime === true){req.session.currentPrime = req.session.resultsArray[req.session.currentNumber];}
			else{
				req.session.matchedArray = [req.session.currentPrime.id, req.session.resultsArray[req.session.currentNumber].id]
			}
		res.send(req.session.resultsArray[req.session.currentNumber].Answers[0]);
	}
}
exports.getMatch=function(req, res){
	req.session.currentNumber=0;
	req.session.noMatch = [req.session.UserId, req.session.currentPrime.id];
	req.session.resultsArray=[];
	models.Vote.findAll({
		where:{UserId:req.session.UserId},
		include: [{
		where: { UserId: Sequelize.col('User.id') },
    model: models.Matched,
        where: { MatchedId: Sequelize.col('Matched.id') },
      }]
	}).then(function (data){
		if (data.length < 1) {return true}
		else {
			for (var i = 0; i < data.length; i++) {
				if (data[i].Matched.dataValues.user1 == req.session.currentPrime.id){
					req.session.noMatch.push(data[i].Matched.dataValues.user2)
				}
				else if  (data[i].Matched.dataValues.user2 == req.session.currentPrime.id){
					req.session.noMatch.push(data[i].Matched.dataValues.user1)
				}
			}
		}
	}).then(function(){
		models.User.findAll({
		where:{
			id:{$notIn: req.session.noMatch},
			match:1,
			city:req.session.currentPrime.city,
			//gender must be seeking, seeking must be gender
			age:{ $between: [	req.session.currentPrime.lower, 	req.session.currentPrime.upper] } ,
			lower:{$lte: req.session.currentPrime.age},
			upper:{$gte: req.session.currentPrime.age},
			gender: req.session.currentPrime.seeking,
			seeking:req.session.currentPrime.gender,
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
			if (results.length === 0){res.send(false);}
			else{dataStore(res, req, results, false);}
		});
	});
}

exports.findPrime = function(req, res){
	req.session.currentNumber=0;
	req.session.resultsArray=[];
	req.session.noMatch = [req.session.UserId];
	//make a find?  find one?
	//gets a list of the possible primes that the user has said no to
	models.User.findAll({
		where:{id:{$notIn: req.session.noMatch},match:1,},
		attributes: ['id', 'city', "upper", "lower", "age", "seeking", "gender"],
		include: [{
    model: models.Answer,
        where: { UserId: Sequelize.col('User.id') },
   			attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'UserId'] },
    }],
	  order: [ Sequelize.fn( 'RAND' ),]
	}).then(function(results){dataStore(res, req, results, true);});
}

exports.nextPrime = function(req, res){
	next(res, req, true)
}

exports.nextMatch = function(req, res){
	next(res, req, false)
}

