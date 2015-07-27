# node-geturlData
Get Url Meta Info and images present in that page in a Strucutred way, which can be accessed easily.

Works for HTTP and HTTPS protocols

## Install
npm install geturldata
  
## Fetch meta info

Example

    var geturldata = require("geturldata");

    // Fetch data
    geturldata({uri:"http://example.com"}, function(error, data){
        //Handel the error and the data
    });
