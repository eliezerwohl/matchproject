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

var Matched = connection.define("Matched",{
  user1:Sequelize.INTEGER,
  user1Vote:  {type:Sequelize.BOOLEAN},
  user2:Sequelize.INTEGER,
  user2Vote:  {type:Sequelize.BOOLEAN},
  // clicks: sequelize.literal('clicks +1')
  yes:{type:Sequelize.INTEGER, default:0},
  no:{type:Sequelize.INTEGER, default:0},
  //when both answer, change
  search:{type:Sequelize.STRING, default:"OK"},
  //if only one person answer, put thier id
  answered:{type:Sequelize.INTEGER, default:0},
});

var Vote = connection.define("Votes", {
  vote:{type:Sequelize.BOOLEAN, default:false}
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
User.hasMany(Answer);
Answer.belongsTo(User);
User.hasMany(Answer);
Answer.belongsTo(User);

exports.Vote = Vote;
exports.Matched = Matched;
exports.User=User;
exports.Answer=Answer;

connection.sync({})
