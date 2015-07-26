# node-geturlData
Get Url Meta Info and images

## Install
npm install geturldata
  
## Fetch meta info

Example

    var geturldata = require("geturldata");

    // Fetch data
    geturldata({uri:"http://example.com"}, function(error, data){
        //Handel the error and the data
    });
