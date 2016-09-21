var password = require("../ignore/ignore.js");
var Sequelize = require('sequelize');
if (process.env.NODE_ENV === 'production') {
  // HEROKU DB
  console.log(process.env.JAWSDB_URL);
  var connection = new Sequelize(process.env.JAWSDB_URL);
} else {
  // LOCAL DB

  var connection = new Sequelize('match', 'root', password.password); }
  var User = connection.define('User', {
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  password: Sequelize.STRING,
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  match:{
    type:Sequelize.BOOLEAN,
    defaultValue:0},
    
  age:Sequelize.INTEGER,
  city: Sequelize.STRING,
  upper:Sequelize.INTEGER,
  lower:Sequelize.INTEGER,
  seeking:Sequelize.STRING,
  gender:Sequelize.STRING,
});

var Filter = connection.define('Filter', {

});
//if a match put as matchId, user doesn't want to match them with anybody
var MakerFilter = connection.define('MakerFilter', {
matchId:Sequelize.INTEGER,
});

//if the person think they're a bad match, it goes here
//so if they try to match the prime again, they won't 
//come across the same people
var MatchFilter = connection.define("MatchFilter",{
  primeId:Sequelize.INTEGER,
  matchId:Sequelize.INTEGER,
});

//when the person matches the people it goes here
//so if both people agree based on profiles
//the people who matched them get points
//+5 for good, -1 for bad
var PossibleMatches = connection.define("PossibleMatches",{
  primeId:Sequelize.INTEGER,
  matchId:Sequelize.INTEGER,
});

var Matched = connection.define("Matched",{
  user1:Sequelize.INTEGER,
  user1Vote:  {type:Sequelize.BOOLEAN, defaultValue:0},
  user2:Sequelize.INTEGER,
  user2Vote:  {type:Sequelize.BOOLEAN, defaultValue:0},
});

var Vote = connection.define("Votes", {
  vote:{type:Sequelize.BOOLEAN, defaultValue:0}
})


var Answer = connection.define('Answer', {
  a091201:Sequelize.STRING,
  a091202:Sequelize.STRING,
  a091203:Sequelize.STRING,
  a091204:Sequelize.STRING,
});  

User.hasMany(Vote);
Vote.belongsTo(User);
Matched.hasMany(Vote);
Vote.belongsTo(Matched);


User.hasMany(MakerFilter);
MakerFilter.belongsTo(User);
User.hasMany(Filter);
Filter.belongsTo(User);
User.hasMany(Answer);
Answer.belongsTo(User);
User.hasMany(Answer);
Answer.belongsTo(User);

exports.Vote = Vote;
exports.Matched = Matched;
exports.MakerFilter = MakerFilter;
exports.User=User;
exports.Answer=Answer;
exports.Filter=Filter;

connection.sync({})
