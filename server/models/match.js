var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var matchSchema = new Schema({
	//id is so can you view all teh answers from a user
	//without indentifying the user
	_user: {
		type:Schema.Types.ObjectId,
		ref: "User"
	},
	complete:{type:Boolean, default:0},
	answer:[{
					question:{
					type:Schema.Types.ObjectId,
					ref: "question"
					},
					answer:String,
	}]
	//if radio or checkbox
});

var Match = mongoose.model("Match", MatchSchema);
module.exports=Match;

status booleons
_user:
