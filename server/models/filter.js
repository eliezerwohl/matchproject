var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var FilterSchema = new Schema({
	_user:{
		type:Schema.Types.ObjectId,
		ref: "User"
	}
	//for the people being matched
	upper:Number,
	lower:Number,
	city:String
	// User.find({age: {$gte: 21, $lte: 65}}, callback);
	//for use with matchers only, so they will only have this.  
	//will be used so they can't match people more than once
	matched:[{
		type:Schema.Types.ObjectId,
		ref: "User"
	}]

});

var Filter = mongoose.model("Filter", FilterSchema);
module.exports = Filter;

//will be used in two ways.  if the matches has