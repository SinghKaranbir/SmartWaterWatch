var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
module.exports = function(passport){

    // Login
    router.post('/login', function(req, res, next) {
        passport.authenticate('login', function(err, user, info) {

            if (err) { return next(err); }

            if (!user) { return res.send({state: 'failure', user: null, message: info.message}); }

            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.send({state: 'success', user: user});
            });
        })(req, res, next);
    });


    //Registration of User.
    router.post('/register', function(req, res) {

        User.findOne({ 'email' :  req.body.email }, function(err, user) {

            // In case of any error, return using the done method
            if (err){
                return res.send({state: 'failure',message: 'Internal Error'});
            }

            // already exists
            if (user) {
                console.log('User Already exists with email '+req.body.email);
                return res.send({state: 'failure', message: 'User Already exists with email '+req.body.email});
            }else {

                async.waterfall([
                    function (done) {
                        crypto.randomBytes(20, function (err, buf) {
                            var token = buf.toString('hex');
                            done(err, token);
                        });
                    },
                    function (token, done) {
                        // if there is no user, create the user
                        var newUser = new User();

                        // set the user's local credentials
                        newUser.email = req.body.email;
                        newUser.password = req.body.password;
                        newUser.firstName = req.body.firstName;
                        newUser.lastName = req.body.lastName;
                        newUser.gender = req.body.gender;
                        newUser.phoneNumber = req.body.phoneNumber;
                        newUser.verifyToken = token;

                        newUser.save(function (err) {
                            if (err) console.log(err);
                            done(err, token, newUser);
                        });
                    },
                    function (token, newUser, done) {
                        var smtpTransport = nodemailer.createTransport('SMTP', {
                            service: 'Gmail',
                            auth: {
                                user: 'feedback.onedeveloper@gmail.com',
                                pass: 'karan1993'
                            }
                        });
                        var mailOptions = {
                            to: newUser.email,
                            from: 'passwordreset@demo.com',
                            subject: 'SmartWaterWatch Email verification',
                            text: 'Thanks for Signing up on Smart Water Watch. Please Click on the below link to verify your email \n\n' +
                            'http://' + req.headers.host + '/api/verify/' + token + '\n\n' +
                            'If you did not sign up at Smart Water Watch, please ignore this email.\n'
                        };
                        smtpTransport.sendMail(mailOptions, function (err) {
                            res.send({'status': 'success', 'message': 'Registration Successful'});
                            done(err, 'done');
                        });
                    }
                    ], function (err) {
                        if (err) console.log(err);

                });
            }
        });
    });

    //log out
    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    return router;

}