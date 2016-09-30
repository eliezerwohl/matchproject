var models = require("../models/models.js");
var Sequelize = require('sequelize');
var matchedId;
var user1Vote;
var user2Vote;
var trueArray =[];
var falseArray =[];

exports.userSave = function(req, res) {
  if (req.session.dailyMatch < req.session.UserId) {
    models.Matched.update({
      user2Vote: req.body.data
    }, {
      where: {
        user1: req.session.dailyMatch,
        user2: req.session.UserId
    	}
    }).then(function(data) {
      models.Matched.findOne({
        where: {
            user1: req.session.dailyMatch,
            user2: req.session.UserId
        }
      }).then(function(data) {
      	matchedId	= data.dataValues.id;
      	user1Vote = data.dataValues.user1Vote;
      	user2Vote = data.dataValues.user2Vote;
	      if (data.dataValues.user1Vote === null) {
	        //both haven't voted 
	        models.Matched.update({
	          answered: req.session.UserId
	        }, {
            where: {
            	id: data.dataValues.id
            }
	        })
	      } else {
    		 //both have voted
          models.Matched.update({
            search: "None"
          }, {
            where: {
                id: matchedId
            }
          }).then(function(data) {
            models.Vote.findAll({
              where: {
                MatchedId: matchedId
              }
            }).then(function(data) {
              if (user1Vote === user2Vote) {
              	for (var i = 0; i < data.length; i++) {
              		if(data[i].dataValues.vote === true){
              			trueArray.push(data[i].dataValues.UserId)
              		}
              		else{
              			falseArray.push(data[i].dataValues.UserId)
              		}
              	}
	              if (user1Vote === true) {
	              	models.User.update({
	              		score: Sequelize.literal('score +5')},
										{where:{
											id:{$in:trueArray}
										}
									}).then(function(data){
										models.User.update({
               		    score: Sequelize.literal('score -1')},
											{where:{
												id:{$in:falseArray}
											}
										}).then(function(data){

										})
									})
                } else {
                	models.User.update({
              		 	score: Sequelize.literal('score -1')},
										{where:{
											id:{$in:trueArray}
										}
									}).then(function(data){
										models.User.update({
	              			score: Sequelize.literal('score +5')},
											{where:{
												id:{$in:falseArray}
											}
										}).then(function(data){

										});
									});
                }
            	} 
            	else {

                // nothing has happened, they didn't agree
            	}
        		});
	        });
        }
      });
    });
  } else {
  	debugger
    models.Matched.update({
      user1Vote: req.body.data
    }, {
      where: {
        user2: req.session.dailyMatch,
        user1: req.session.UserId
      }
    }).then(function(data, option) {
      models.Matched.findOne({
        where: {
          user2: req.session.dailyMatch,
          user1: req.session.UserId
        }
      }).then(function(data) {
      	debugger
        matchedId	= data.dataValues.id
        if (data.dataValues.user2Vote === null) {
            //both haven't voted
          models.Matched.update({
              answered: req.session.UserId
          }, {
              where: {
                id: matchedId
              }
          });
        } 
        else {
              //both have voted
          models.Matched.update({
            search: "None"
          }, {
            where: {
                MatchedId: matchedId
            }
          }).then(function(data) {
            models.Vote.findAll({
                where: {
                    id: voteId
                }
            }).then(function(data) {
              if (user1.vote === user2.vote) {
                  //update scores correcly
                  // get all the votes
                  // two array, yes and not
                if (user.vote == 0) {
                    // update all with 0 +5
                    // update as a 1 as - 1

                } else {
                    // update all with 1 +5
                    // update as a 0 as - 1
                }
            	} else {
                // nothing has happened
            	}
        		});
          });
        }
      });
    });
  }
}

