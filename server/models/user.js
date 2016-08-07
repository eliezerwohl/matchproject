
// //easy setup up
// firstName:String,
// lastName:String,
// email:String,
// password:String

var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var UserSchema= new Schema({
	firstName:String,
	lastName:String,
	city:String,
	account:String,
	username:String,
	password:String,
	_survey: [{
   type: Schema.Types.ObjectId,
   ref: 'Survey'
 }],
});

var User = mongoose.model('User', UserSchema);

module.exports = User;