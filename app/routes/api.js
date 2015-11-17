var express = require('express');
var router = express.Router();



isAuthenticated = function(req, res, next){

    if(req.isAuthenticated()){
        return next();
    }

    res.redirect('/#login');
};


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


    	})

        

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


        })

   


module.exports = router;
