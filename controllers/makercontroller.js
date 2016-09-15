var models = require("../models/models.js");
var Sequelize = require('sequelize');
var primeResults;
var primeNumber;
var currentPrime;	

function primeSend(res, data){
	currentPrime = data.id
	res.send(data.Answers[0].dataValues)
}

exports.findPrime = function(req, res){
	primeNumber=0;
	primeResults=[];
	var noMatch = [];
	//make a find?  find one?
	models.MakerFilter.findAll({
		where:{
			//after testing make this req.session.UserId
			UserId:1,
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
			account:"match"
		},
		attributes: ['id'],
		include: [{
    model: models.Answer,
        where: { UserId: Sequelize.col('User.id') },
   			attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'UserId'] },
    }],
	  order: [
	    Sequelize.fn( 'RAND' ),
	  ]
		}).then(function(results){
			debugger
				//stored results in array so don't have to search again
			for (var i = 0; i < results.length; i++) {
				primeResults.push(results[i].dataValues);
			}
		}).then(function(){
			primeSend(res, primeResults[0])
		});
	});
}

exports.nextPrime = function(req, res){
  primeNumber ++;
  primeSend(res, primeResults[primeNumber]);
  //also has to put the id in matchfilter
}

// exports.matched = function(req, res){
// 	first match match match match filter
// 	then search everybody who fits the description
// }