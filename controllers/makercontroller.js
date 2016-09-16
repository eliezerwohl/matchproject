var models = require("../models/models.js");
var Sequelize = require('sequelize');
var primeResults;
var primeNumber;
var currentPrime;	


exports.getMatch=function(req, res){
	//if i change the user model to incorperate the filter, then i can query for all at once
	var noMatch = [req.session.UserId, primeData];
	//find people the user already matched them with
	models.Filter.findOne({
		where:{UserId:primeData}})
	.then(function(data){
		debugger
		//terrible fix for searchign for both.  will have to redo how data is entered
		if(data.dataValues.seeking === "both"){
			data.dataValues.seeking = [m, f]
		}
		models.User.findAll({
		where:{
			id:{$notIn: noMatch},
			match:1,
		},
		attributes: ['id'],
		include: [{
	    model: models.Answer,
	        where: {Answer.city: 	"Vice City"};
	       //   gender: data.dataValues.seeking,
	      	// age:{ $between: [	data.dataValues.lower, 	data.dataValues.upper] } },
	   			attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'UserId'] },
    }],
	  order: [
	    Sequelize.fn( 'RAND' ),
	  ]
		}).then(function(results){
			debugger

		})
})
}

var primedata;
function primeSend(res, data){
	primeData = data.id
	res.send(data.Answers[0].dataValues)
}

exports.findPrime = function(req, res){
	primeNumber=0;
	primeResults=[];
	var noMatch = [req.session.UserId];
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
				//stored results in array so don't have to search again
			for (var i = 0; i < results.length; i++) {
				primeResults.push(results[i].dataValues);
			}
		}).then(function(){
			currentPrime = primeResults[0];
			primeSend(res, currentPrime)
		});
	});
}

exports.nextPrime = function(req, res){
  primeNumber ++;
 	currentPrime = primeResults[primeNumber];
  primeSend(res, currentPrime);
  //also has to put the id in matchfilter
}

// exports.matched = function(req, res){
// 	first match match match match filter
// 	then search everybody who fits the description
// }