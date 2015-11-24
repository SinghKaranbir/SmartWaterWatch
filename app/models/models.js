var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
	email: String,
	password: String,
	firstName: String,
	lastName: String,
	gender: String,
	phoneNumber: String,
	createdAt: {type: Date, default: Date.now()},
	resetPasswordToken: String,
	resetPasswordExpires: Date,
	verified: {type: Boolean, default: false},
	verifyToken: String
});

var sensorSchema = new mongoose.Schema({

	userId : ObjectId,
	sensorName : String,
	serialNo : String,
	sensorType: String,
	mainSensorId : ObjectId
});

var sensorDataSchema = new mongoose.Schema({

	sensorId: ObjectId,
	data: String
});



userSchema.pre('save', function(next) {
	var user = this;
	var SALT_FACTOR = 5;

	if (!user.isModified('password')) return next();

	bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

mongoose.model('User', userSchema);
mongoose.model('Sensor', sensorSchema);
mongoose.model('SensorData', sensorDataSchema);
