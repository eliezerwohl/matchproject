var password = require("../ignore/ignore.js");
var Sequelize = require('sequelize');
if (process.env.NODE_ENV === 'production') {
  // HEROKU DB
  console.log(process.env.JAWSDB_URL);

  var connection = new Sequelize(process.env.JAWSDB_URL);
} else {
  // LOCAL DB
  var connection = new Sequelize('match', 'root', password.password);
  // var connection = new Sequelize('match', 'root');

  var User = connection.define('User', {
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  password: Sequelize.STRING,
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  account: Sequelize.STRING,
});

var Filter = connection.define('Filter', {
  city: Sequelize.STRING,
  upper:Sequelize.INTEGER,
  lower:Sequelize.INTEGER,
  seeking:Sequelize.STRING,
  gender:Sequelize.STRING,
});

var Answer = connection.define('Answer', {
  a091201:Sequelize.STRING,
  a091202:Sequelize.STRING,
  a091203:Sequelize.STRING,
  a091204:Sequelize.STRING,
});  


User.hasMany(Filter);
Filter.belongsTo(User);
User.hasMany(Answer);
Answer.belongsTo(User);
User.hasMany(Answer);
Answer.belongsTo(User);

exports.User=User;
exports.Answer=Answer;
exports.Filter=Filter;

connection.sync({force:true})
}

