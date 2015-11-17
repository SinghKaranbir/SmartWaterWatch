var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
	email: String,
	password: String,
	firstName: String,
	lastName: String,
	created_at: {type: Date, default: Date.now}
})

mongoose.model('User', userSchema);