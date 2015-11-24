var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var User = mongoose.model('User');
var async = require('async');
var crypto = require('crypto');

/*isAuthenticated = function(req, res, next){

    if(req.isAuthenticated()){
        return next();
    }

    res.redirect('/#login');
};*/


 //sends failure login state back to angular
    router.route("/sensor-data")

    	//add data to sensor-data
    	.post(function(req, res){

    		var mainSensor =req.body.mainSensor;
    		var secondarySensors = req.body.secondarySensors

    		res.send({ 'message' : 'TODO SENSOR CONSUME API',
    					'mainSensor' : mainSensor,
    					'secondarySensors' : secondarySensors
   					});


    	});

        

  //sends failure login state back to angular
    router.route("/add-sensor")

        //add data to sensor-data
        .post(function(req, res){

            var mainSensor =req.body.mainSensor;
            var secondarySensors = req.body.secondarySensors

            res.send({ 'message' : 'TODO SENSOR CONSUME API',
                        'mainSensor' : mainSensor,
                        'secondarySensors' : secondarySensors
                    });


        });

    //Forgot Password Implementation.
    router.route("/forgot")


    .post(function(req, res){

            async.waterfall([
                function(done) {
                    crypto.randomBytes(20, function(err, buf) {
                        var token = buf.toString('hex');
                        done(err, token);
                    });
                },
                function(token, done) {
                    User.findOne({ email: req.body.email }, function(err, user) {
                        if (!user) {
                            return res.send({status: 'failure', message: 'No Account with that email address exists.'});
                        }

                        user.resetPasswordToken = token;
                        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                        user.save(function(err) {
                            done(err, token, user);
                        });
                    });
                },
                function(token, user, done) {
                    var smtpTransport = nodemailer.createTransport('SMTP', {
                        service: 'Gmail',
                        auth: {
                            user: 'feedback.onedeveloper@gmail.com',
                            pass: 'karan1993'
                        }
                    });
                    var mailOptions = {
                        to: user.email,
                        from: 'passwordreset@demo.com',
                        subject: 'Node.js Password Reset',
                        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                        'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                    };
                    smtpTransport.sendMail(mailOptions, function(err) {
                        res.send({status: 'success', message: 'Email has been sent to it.'});
                        done(err, 'done');
                    });
                }
            ], function(err) {
                if (err) console.log(err);

            });

    });

    // Reset Implementation.

    router.route("/reset/:token")

        .get(function(req,res){

            User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {

                 if (!user) {
                return res.redirect('/forgot',{status: 'failure', message:'Password reset token is invalid or has expired.'});
                 }

                res.render('reset');
            });
        })

        .post(function(req,res) {

            async.waterfall([
                function (done) {
                    User.findOne({
                        resetPasswordToken: req.params.token,
                        resetPasswordExpires: {$gt: Date.now()}
                    }, function (err, user) {
                        if (!user) {
                            return res.redirect('/forgot',{status: 'failure', message:'Password reset token is invalid or has expired.'});
                        }

                        user.password = req.body.password;
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpires = undefined;

                        user.save(function (err) {
                            req.logIn(user, function (err) {
                                done(err, user);
                            });
                        });
                    });
                },
                function (user, done) {
                    var smtpTransport = nodemailer.createTransport('SMTP', {
                        service: 'Gmail',
                        auth: {
                            user: 'feedback.onedeveloper@gmail.com',
                            pass: 'karan1993'
                        }
                    });
                    var mailOptions = {
                        to: user.email,
                        from: 'passwordreset@demo.com',
                        subject: 'Your password has been changed',
                        text: 'Hello,\n\n' +
                        'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
                    };
                    smtpTransport.sendMail(mailOptions, function (err) {
                        req.flash('success', 'Success! Your password has been changed.');
                        done(err);
                    });
                }
            ], function (err) {
                res.redirect('/');
            });
        });

module.exports = router;
