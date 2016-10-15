var models = require("../models/models.js");
var bcrypt = require("bcryptjs");

function saltyhash(pass) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(pass, salt);
  return hash;
}
exports.signUp = function(req, res){
  models.User.findOne({
      where: {
        email: req.body.email
      }
    }).then(function(results) {
      if (results) {
        res.redirect("/adminCreate?msg=Your email is already registered, please login.");
      } else {
        models.User.create({
          lastname: (req.body.lastName).trim(),
          firstname:  (req.body.firstName).trim(),
          email: req.body.email,
          password: saltyhash(req.body.password),
          account:req.body.account.toLowerCase(),
        }).then(function(data) {
          var tempId = data.dataValues.id;
            models.Answer.create({
              UserId:data.dataValues.id,
            });
          res.redirect("/?msg=Thanks for registering, please login.");
        });
      }
    });
  }
exports.loginData = function(req, res){
  //if score is 0, wont' cause an error this way
  var data={match:req.session.match}
  res.send(data)
}
exports.loggedin = function (req, res){
   models.User.findOne({
    where: [{
      email: req.user.username
    }]
  }).then(function(User) {
    req.session.score = User.dataValues.score;
    req.session.match = User.dataValues.match;
    req.session.UserId = User.dataValues.id;
    req.session.account  = User.dataValues.account;
    var greeting = User.dataValues.greeting
    req.session.save()

    if (greeting == false ){
      res.render("greeting")
      req.session.tempGreeting = false
      req.session.save()
      models.User.update({
        greeting:1
        },{where:{id:req.session.UserId}
      });
    }
    else{
       res.render("home");
    }
  });
}

exports.score = function(socket, io) {
  function score() {
    models.User.findOne({
      where:{id:socket.handshake.session.UserId}
    }).then(function(data){
      if (data.dataValues.score != socket.score){
        callback(data.dataValues.score)
        io.to(socket.id).emit('score', data.dataValues.score);}
    });     
  }
  score()
  function callback(score){
    socket["score"] = score
  }
  setInterval(score, 10000);
}

exports.notifyConnect = function(socket, io){
  function notify(){
  models.NotifyConnect.findAll({
    where:{
    UserId:socket.handshake.session.UserId}
  }).then(function(data){
       if (data.length != socket.notify){
         callback(data.length)
    io.to(socket.id).emit('notify', data.length)
    }
  })

  }
  notify()
   function callback(notify){
    socket["notify"] = notify
  }
  setInterval(notify, 10000);
}

exports.checkedNotify = function(socket, io){
      models.NotifyConnect.destroy({
      where:{
        UserId:socket.handshake.session.UserId
      }
    })
}

exports.newMessage = function(socket, io){
  function newMessage(){
    models.Message.findAndCountAll({
      where:{
        reciveId:socket.handshake.session.UserId,
        checked:0
      }
    }).then(function(data){
      if (data.count != socket.newMessage){
        callback(data.count)
        io.to(socket.id).emit('newMessage', data.count)
      }
    });
  }
  newMessage()
  function callback(newMessage){
    socket["newMessage"] = newMessage
  }
  setInterval(newMessage, 1000);
}

export.bulkData = function(req, res){
  models.User.bulkCreate([
      {id:1, email:1, password:"$2a$10$VzHzSwBvgfDmPDZbDSMzJeqI7zP1Ktz9KwZZRvpxhqb7e5JfAcU6K",
        firstname:1, lastname:1, match:1, age:22, city:"Liberty City",
        upper:40, lower:20, seeking:"M", gender:"M", createdAt:"2016-09-24 19:08:35", updatedAt:"2016-09-24 19:08:35"},
        
        {id:2, email:2, password:"$2a$10$XEot/PoEX/w.wWS3d6zQDeqz2LwpPLXOXyeOMZGGcmHT.knUWKqSG",
        firstname:1, lastname:1, match:1, age:22, city:"Liberty City",
        upper:40, lower:20, seeking:"M", gender:"M", createdAt:"2016-09-24 19:08:35", updatedAt:"2016-09-24 19:08:35"},
        
        {id:3, email:3, password:"$2a$10$AUWPkehEk8RrCxvzz/ZJ7ebawLXTd5mIwJY77aMotjKTnEmqRxota",
        firstname:1, lastname:1, match:1, age:22, city:"Liberty City",
        upper:40, lower:20, seeking:"M", gender:"M", createdAt:"2016-09-24 19:08:35", updatedAt:"2016-09-24 19:08:35"},
        
        {id:4, email:4, password:"$2a$10$GlAdHmjLbDVf1EonTDZxheCPVkVjEIhqjlm2vNpHcHUjYUpCwmQgC",
        firstname:1, lastname:1, match:1, age:22, city:"Liberty City",
        upper:40, lower:20, seeking:"M", gender:"M", createdAt:"2016-09-24 19:08:35", updatedAt:"2016-09-24 19:08:35"},
        
        {id:5, email:5, password:"$2a$10$F.z39S.yi0UhrZO2Sj3gceROs40zxd/S//Ae3gdYnePazZ/OkSTDC",
        firstname:1, lastname:1, match:1, age:22, city:"Liberty City",
        upper:40, lower:20, seeking:"M", gender:"M", createdAt:"2016-09-24 19:08:35", updatedAt:"2016-09-24 19:08:35"},
      ]);

models.Answer.bulkCreate([
{id:1, UserId:1, a091201:1, a091202:1, a091203:1, a091204:1, createdAt:"2016-09-24 19:08:35" , updatedAt:"2016-09-24 19:08:35"},
{id:2, UserId:2, a091201:2, a091202:2, a091203:2, a091204:2, createdAt:"2016-09-24 19:08:35" , updatedAt:"2016-09-24 19:08:35"},
{id:3, UserId:3, a091201:3, a091202:3, a091203:3, a091204:3, createdAt:"2016-09-24 19:08:35" , updatedAt:"2016-09-24 19:08:35"},
{id:4, UserId:4, a091201:4, a091202:4, a091203:4, a091204:4, createdAt:"2016-09-24 19:08:35" , updatedAt:"2016-09-24 19:08:35"},
{id:5, UserId:5, a091201:5, a091202:5, a091203:5, a091204:5, createdAt:"2016-09-24 19:08:35" , updatedAt:"2016-09-24 19:08:35"},

])

  models.Matched.bulkCreate([
    {id:1, chat:0, user1:2, user2:4, yes:1,  no:1, search:"OK", answered:0, avg:50, createdAt:"2016-09-27 00:35:04", updatedAt:"2016-09-27 00:35:04"}
    ])

  models.Vote.bulkCreate([
    {id:1, vote:1, UserId:1, MatchedId:1, createdAt:"2016-09-27 00:35:04", updatedAt:"2016-09-27 00:35:04"},
    {id:2, vote:0, UserId:3, MatchedId:1, createdAt:"2016-09-27 00:35:04", updatedAt:"2016-09-27 00:35:04"}
    ])
  
}