# node-geturlData
Get Url Meta Info and images

## Install
npm install geturldata
  
## Fetch meta info

Example
  
  var geturldata = require('geturldata');
  
  geturldata({uri:"http://example.com"}, function(err, data){
    if(err){
      console.log('error occured')
    }
    console.log(data)
  })
