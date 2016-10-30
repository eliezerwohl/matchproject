var models = require("../models/models.js");
var Sequelize = require('sequelize');
//need to make sure that prime's age is within what the match wants
exports.getMatch=function(req, res){
	req.session.currentNumber=0;
	var noMatch = []
	models.MatchData.findOne({
		where:{UserId:req.session.UserId}
	}).then(function(data){
		var currentPrime = JSON.parse(data.currentPrime)
		noMatch = [req.session.UserId, currentPrime.id];
		var resultsArray=[];
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
					if (data[i].Matched.dataValues.user1 == currentPrime.id){
						noMatch.push(data[i].Matched.dataValues.user2)
					}
					else if  (data[i].Matched.dataValues.user2 == currentPrime.id){
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
				if (results.length === 0){res.send(false);}
				else{
					res.send(results[0].dataValues.Answers[0]);
					models.MatchData.update({
						matchArray:JSON.stringify(results),
						matchId:results[0].dataValues.id
					 },
						{where:{id:req.session.UserId},
					})
				}
			});
		});
	})
}

exports.findPrime = function(req, res){
	var noMatch = [req.session.UserId];
	//make a find?  find one?
	//gets a list of the possible primes that the user has said no to
	models.User.findAll({
		where:{id:{$notIn: noMatch},match:1,},
		attributes: ['id', 'city', "upper", "lower", "age", "seeking", "gender"],
		include: [{
    model: models.Answer,
        where: { UserId: Sequelize.col('User.id') },
   			attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'UserId'] },
    }],
    	order: [ Sequelize.fn( 'RAND' ),]
	}).then(function(results){
		//extra random?
		var random = Math.floor(Math.random() * results.length);
		res.send(results[random].dataValues.Answers[0]);
		models.MatchData.update({
			currentPrime:JSON.stringify(results[random].dataValues)
		},{
			where:{UserId:req.session.UserId}
		})
	})
}

exports.nextMatch = function(req, res){
	req.session.currentNumber ++ ;
	models.MatchData.findOne({
		where:{UserId:req.session.UserId},
		attributes:["matchArray"]
	}).then(function(data){
		var match = JSON.parse(data.matchArray);
		if (req.session.currentNumber == match.length){
			res.send(false)
		}
		else{res.send (match[req.session.currentNumber].Answers[0]);}
	})
}

