var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var  questionSchema = new Schema({
	//id is so can you view all teh answers from a user
	//without indentifying the user
	question:String,
	order:Number,
});

var Question = mongoose.model("Question", QuestionSchema);
module.exports=Question
