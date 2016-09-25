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


// User.bulkCreate([
//       {id:1, email:1, password:"$2a$10$VzHzSwBvgfDmPDZbDSMzJeqI7zP1Ktz9KwZZRvpxhqb7e5JfAcU6K",
//         firstname:1, lastname:1, match:1, age:22, city:"Liberty City",
//         upper:40, lower:20, seeking:"M", gender:"M", createdAt:"2016-09-24 19:08:35", updatedAt:"2016-09-24 19:08:35"},
        
//         {id:2, email:2, password:"$2a$10$XEot/PoEX/w.wWS3d6zQDeqz2LwpPLXOXyeOMZGGcmHT.knUWKqSG",
//         firstname:1, lastname:1, match:1, age:22, city:"Liberty City",
//         upper:40, lower:20, seeking:"M", gender:"M", createdAt:"2016-09-24 19:08:35", updatedAt:"2016-09-24 19:08:35"},
        
//         {id:3, email:3, password:"$2a$10$AUWPkehEk8RrCxvzz/ZJ7ebawLXTd5mIwJY77aMotjKTnEmqRxota",
//         firstname:1, lastname:1, match:1, age:22, city:"Liberty City",
//         upper:40, lower:20, seeking:"M", gender:"M", createdAt:"2016-09-24 19:08:35", updatedAt:"2016-09-24 19:08:35"},
        
//         {id:4, email:4, password:"$2a$10$GlAdHmjLbDVf1EonTDZxheCPVkVjEIhqjlm2vNpHcHUjYUpCwmQgC",
//         firstname:1, lastname:1, match:1, age:22, city:"Liberty City",
//         upper:40, lower:20, seeking:"M", gender:"M", createdAt:"2016-09-24 19:08:35", updatedAt:"2016-09-24 19:08:35"},
        
//         {id:5, email:5, password:"$2a$10$F.z39S.yi0UhrZO2Sj3gceROs40zxd/S//Ae3gdYnePazZ/OkSTDC",
//         firstname:1, lastname:1, match:1, age:22, city:"Liberty City",
//         upper:40, lower:20, seeking:"M", gender:"M", createdAt:"2016-09-24 19:08:35", updatedAt:"2016-09-24 19:08:35"},
//       ]);

Answer.bulkCreate([
{id:1, UserId:1, a091201:1, a091202:1, a091203:1, a091204:1, createdAt:"2016-09-24 19:08:35" , updatedAt:"2016-09-24 19:08:35"},
{id:2, UserId:2, a091201:2, a091202:2, a091203:2, a091204:2, createdAt:"2016-09-24 19:08:35" , updatedAt:"2016-09-24 19:08:35"},
{id:3, UserId:3, a091201:3, a091202:3, a091203:3, a091204:3, createdAt:"2016-09-24 19:08:35" , updatedAt:"2016-09-24 19:08:35"},
{id:4, UserId:4, a091201:4, a091202:4, a091203:4, a091204:4, createdAt:"2016-09-24 19:08:35" , updatedAt:"2016-09-24 19:08:35"},
{id:5, UserId:5, a091201:5, a091202:5, a091203:5, a091204:5, createdAt:"2016-09-24 19:08:35" , updatedAt:"2016-09-24 19:08:35"},

])

connection.sync({})
