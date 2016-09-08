var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AnswerSchema = new Schema({
	_user:{
		type:Schema.Types.ObjectId,
		ref: "User"
	}
	_question: {
		type:Schema.Types.ObjectId,
		ref: "Question"
	},
	//the person who answered
	answer:String
});

var Answer = mongoose.model("Answer", AnswerSchema);
module.exports = Answer;