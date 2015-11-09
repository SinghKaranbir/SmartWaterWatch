var express = require('express');
var router = express.Router();


//api for all posts
router.route('/')
	

	.get(function(req, res){

		
		res.send({message:"TODO AUTHENTICATION API"});
	});



module.exports = router;
