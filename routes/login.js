
exports.login = function(req, res){
  //res.send("respond with a resource");
	var u=req.param("email");
     var p=req.param("password");

	/*var c=m.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		socketPath : '/tmp/mysql.sock',
		database: 'swag',
		multipleStatements :true
	});
	
	*/
		
		//Includes
		var cps = require('cps-api');

		//Creating a CPS connection
		var cpsConn = new cps.Connection(  'tcps://cloud-us-0.clusterpoint.com:9008', 'SwagData', 'deebee2307@gmail.com', 'Deebee07..', 'document', 'document/id', {account: 102241});

		// Debug
		//cpsConn.debug = true;
		// Search for documents containing word "USA" in any of the fields AND field Population value > 25000000
		var query = cps.Term("db", "s_password") + cps.Term("db@cluster.com", "s_email");
		// Do not list fields "Lat" and "Long" from the documents
		// Search request and order results by City_Urban_area field in ascending alphabetical order.
		var searchRequest = new cps.SearchRequest(query);

		
		cpsConn.sendRequest(searchRequest, function (err, searchResponse) {
			  if (err) return console.log(err);
			  if (searchResponse.hits > 0) {
			    console.log("Found " + searchResponse.hits + " documents");
			    console.log("showing from " + searchResponse.from + " to " + searchResponse.to + "");
			  }
		})
		//cpsConn.connect();
// var t=c;psConn.query("select count(*) as count from student where s_email='"+(u)+"' and s_password='"+(p)+"'",function(err,result){
 /*console.log(t.sql);	

		if(err){
			console.error(err);
	}
		else{
	 if((result[0].count)>0)
	  console.log('success');
	 
	 else
		 console.log('user not defined');
	 	 
	 }
 });
 */
};

