var models = require("../models/models.js");
var Sequelize = require('sequelize');

exports.userSave = function(req, res) {
	var matchedId;
	var user1Vote;
	var user2Vote;
	res.send("saved")
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
  			dailyMatchFunction(req)
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
          models.Vote.findAll({
            where: {
              MatchedId: matchedId
            }
          }).then(function(data) {
            debugger
     				scoring(data, matchedId, user1Vote, user2Vote, req);
      		});
        }
      });
    });
  } else {
    models.Matched.update({
      user1Vote: req.body.data
    }, {
      where: {
        user2: req.session.dailyMatch,
        user1: req.session.UserId
      }
    }).then(function(data) {
       models.Matched.findOne({
        where: {
          user2: req.session.dailyMatch,
          user1: req.session.UserId
        }
      }).then(function(data){
              dailyMatchFunction(req)
      //there is an error here
      matchedId = data.dataValues.id;
      user1Vote = data.dataValues.user1Vote;
      user2Vote = data.dataValues.user2Vote;
      models.Matched.findOne({
        where: {
          user2: req.session.dailyMatch,
          user1: req.session.UserId
        }
      }).then(function(data) {
        matchedId = data.dataValues.id
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
            models.Vote.findAll({
            where: {
              MatchedId: matchedId
            }
          }).then(function(data){
            scoring(data, matchedId, user1Vote, user2Vote, req);
          });
        }
      });
    });

      })
      

  }
}

function dailyMatchFunction(req) {
  models.User.update({
		dailyMatch:0,
		},
		{
		where:{
			id:req.session.UserId
		}
	});
}

function scoring (data, matchedId, user1Vote, user2Vote, req){
  models.NotifyConnect.create({
    UserId:req.session.dailyMatch,
    MatchedId:matchedId,
  }).then(function(data){
    models.NotifyConnect.create({
    UserId:req.session.UserId,
    MatchedId:matchedId,
    })
  })
	var trueArray = [];
	var falseArray = [];
	if (user1Vote == user2Vote) {
  	for (var i = 0; i < data.length; i++) {
  		if(data[i].dataValues.vote === true){
  			trueArray.push(data[i].dataValues.UserId)
  		}
  		else{
  			falseArray.push(data[i].dataValues.UserId)
  		}
  	}
    if (user1Vote == true) {
    	debugger
    	models.Matched.update({
    		chat:true,
    		search:"none"
    	},{
    		where:{id:matchedId}
    	}).then(function(data){
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
					});
				});
    	});
    } else {
    	models.Matched.update({
    		search:"none"
    	},{
    		where:{id:matchedId}
    	}).then(function(data){
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
					});
				});
    	});
    }
	} 
}