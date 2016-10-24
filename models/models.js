var Sequelize = require('sequelize');
if (process.env.NODE_ENV === 'production') {
  // HEROKU DB
  var connection = new Sequelize('mysql://b1e734d72f7481:840b5f35@us-cdbr-iron-east-04.cleardb.net/heroku_75496f89e747476?reconnect=true');
} else {
  var password = require("../ignore/ignore.js");
  // LOCAL DB
  var connection = new Sequelize('match', 'root', password.password); }
  var User = connection.define('User', {
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  uuid:{ type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1},
  password: Sequelize.STRING,
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  greeting: {type:Sequelize.BOOLEAN, defaultValue:0},
  match:{type:Sequelize.BOOLEAN},
  age:Sequelize.INTEGER,
  city: Sequelize.STRING,
  upper:Sequelize.INTEGER,
  lower:Sequelize.INTEGER,
  seeking:Sequelize.STRING,
  gender:Sequelize.STRING,
  lastMatch:{type:Sequelize.DATE, defaultValue: Sequelize.NOW},
  dailyMatch:{type:Sequelize.INTEGER},
  //currently only doing one match per day, this help allow more matches
  dailyMatchCount:{type:Sequelize.INTEGER, defaultValue:0},
  score:{type:Sequelize.INTEGER, defaultValue:0}
});

var NotifyConnect = connection.define ("NotifyConnect", {
  //matchedid
  //userId
  //delete aftet done
})

var Online = connection.define ("Online", {
  user:Sequelize.STRING,
  online:{type:Sequelize.BOOLEAN, defaultValue:0}
});
var Matched = connection.define("Matched", {
  chat:{type:Sequelize.BOOLEAN, defaultValue:0},
  user1:Sequelize.INTEGER,
  user1Vote:  {type:Sequelize.BOOLEAN},
  user2:Sequelize.INTEGER,
  user2Vote:  {type:Sequelize.BOOLEAN},
  // clicks: sequelize.literal('clicks +1')
  yes:{type:Sequelize.INTEGER, defaultValue:0},
  no:{type:Sequelize.INTEGER, defaultValue:0},
  //when both answer, change
  search:{type:Sequelize.STRING, defaultValue:"OK"},
  //if only one person answer, put thier id
  answered:{type:Sequelize.INTEGER, defaultValue:0},
  avg:{type: Sequelize.INTEGER, defaultValue:0}
});

var Message = connection.define("Message", {
//connect with connected matches and user id
  message:Sequelize.STRING,
  checked:{type:Sequelize.BOOLEAN, defaultValue:0},
  reciveId: Sequelize.STRING,
  MatchedId:Sequelize.INTEGER,
}); 

var Vote = connection.define("Votes", {
  vote:{type:Sequelize.BOOLEAN, defaultValue:false}
})

var Answer = connection.define('Answer', {
  a091201:Sequelize.STRING,
  a091202:Sequelize.STRING,
  a091203:Sequelize.STRING,
  a091204:Sequelize.STRING,
});  

User.hasMany(NotifyConnect);
NotifyConnect.belongsTo(User);
Matched.hasMany(NotifyConnect);
NotifyConnect.belongsTo(Matched);
User.hasMany(Message);
Message.belongsTo(User);
Message.hasOne(Matched);
Matched.belongsTo(Message);
User.hasMany(Vote);
Vote.belongsTo(User);
Matched.hasMany(Vote);
Vote.belongsTo(Matched);
User.hasMany(Answer);
Answer.belongsTo(User);
User.hasMany(Answer);
Answer.belongsTo(User);

exports.NotifyConnect  = NotifyConnect;
exports.Message = Message;
exports.Vote = Vote;
exports.Vote = Vote;
exports.Matched = Matched;
exports.User=User;
exports.Answer=Answer;
exports.Online = Online;
connection.sync({})
