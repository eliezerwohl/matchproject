var models = require("../models/models.js");
var Sequelize = require('sequelize');
var noMatch = []
exports.findPrime = function(req, res){

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
	}}).then(function(results){
		debugger

	})
})

}

  // order: [
  //   Sequelize.fn( 'RAND' ),
  // ]