var express = require('Express');
var router = express.Router();


router.route("/",function(req,res,next){

res.render('index');


});

module.exports = router;