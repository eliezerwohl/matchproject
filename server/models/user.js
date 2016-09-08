
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
	match: [{
		//the other person being match
		_user:	{
	   type: Schema.Types.ObjectId,
	   ref: 'Answer'
	 	},
 		// storing people's votes here
 		up:[{_user:{type:Schema.Types.ObjectId,
		ref: "User"}}],
 		down:[{_user:{type:Schema.Types.ObjectId,
		ref: "User"}}]
 }]
	_answer: [{
   type: Schema.Types.ObjectId,
   ref: 'Answer'
 }],
});

var User = mongoose.model('User', UserSchema);

module.exports = User;