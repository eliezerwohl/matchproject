var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var  questionSchema = new Schema({
	question:String,
	order:Number,
});

var Question = mongoose.model("Question", QuestionSchema);
module.exports=Question
