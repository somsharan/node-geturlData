var cheerio = require('cheerio'),
	http = require('http'),
	https = require('https');
var validUrl = require('valid-url');
var url = require('url');
var canGetData = false;
 
module.exports = getData;
var resObj = {};
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

 function getData(options, callback) {
	 if(validUrl.isUri(options.uri)){
       checkProtocol(options);
     } else {
		callback({error:true,message:'Something wrong in URL'}, null);
	 }	
	 
    /*
    *
    * checking the protocol and accessing the url using related protocol
    *
    *
    *
    *
    */
    function checkProtocol(options) {
        var parsedUri = url.parse(options.uri);
        var uriProtocol = parsedUri.protocol.slice(0,-1);
        if(uriProtocol == 'http') {
            httpFunction(options.uri)
        } else if(uriProtocol == 'https'){
            httpsFunction(options.uri)
        } else {
            callback({error:true, message:'Url protocol is not http/https'})
        }
     }
    /*
    *
    * function to process http protocol
    *
    */
    function httpFunction(basicUri){
        var httpHtmlBody = ''
         http.get(basicUri, function(res) {
            if(res.statusCode == '200'){
                 res.on('data', function (chunk) {
                      httpHtmlBody += chunk
                  });
                  res.on('end', function(){
                      callCheer(httpHtmlBody);
                  })
             } else {
                callback({error: true, message:'http page error code '+res.statusCode});
             }	
        }).on('error', function(e) {
          callback({error:true, message:'Unable to get the Url Data, Please check the URL'})
        });
    }
    /*
    *
    * function to process https protocol
    *
    */
    function httpsFunction(basicUri){
        var httpsHtmlBody = ''
         https.get(basicUri, function(res) {
            if(res.statusCode == '200'){
                 res.on('data', function (chunk) {
                      httpsHtmlBody += chunk
                  });
                  res.on('end', function(){
                      callCheer(httpsHtmlBody);
                  })
             } else {
                callback({error: true, message:'https page error code '+res.statusCode});
             }	
        }).on('error', function(e) {
          callback({error:true, message:'Unable to get the Url Data, Please check the URL'})
        });
    }

    /*
    *
    *Calling Cheerio to format the response
    *
    */
    function callCheer(htmlBody){
        var $ = cheerio.load(htmlBody);
        if($('meta').length > 0){
            parseMetaData($)
        } else {
            parseBody($)
        }
    }

    /*
    *
    *Parsing Meta Data
    *
    */
    function parseMetaData($){
        for(var key in $('meta')){
            var currentObject = $('meta')[key];			
            if(currentObject.attribs && (currentObject.attribs.property == 'og:image' || currentObject.attribs.property == 'image')){
                resObj.logo = currentObject.attribs.content;
            }
            if(currentObject.attribs && (currentObject.attribs.property == 'og:description' || currentObject.attribs.property == 'description')){
                resObj.description = currentObject.attribs.content;
            }
            if(currentObject.attribs && (currentObject.attribs.property == 'og:title' || currentObject.attribs.property == 'title')){
                resObj.title = currentObject.attribs.content;
            }
            if(currentObject.attribs && (currentObject.attribs.property == 'og:url' || currentObject.attribs.property == 'url')){
                resObj.url = currentObject.attribs.content;
            }
            if(currentObject.attribs && (currentObject.attribs.property == 'og:keywords' || currentObject.attribs.property == 'keywords')){
                resObj.keywords = currentObject.attribs.content;
            }
            if(key == $('meta').length - 1){
                parseBody($)
            }

        }


    }

    /*
    *
    *Parsing HTML Body
    *
    */
    function parseBody($){
        resObj.images = [];		
        for(var i = 0; i < $('img').length; i++){
            resObj.images.push({src:$('img')[i].attribs.src, alt:$('img')[i].attribs.alt});
            if($('img').length < 10 && i == $('img').length -1) {
                callback(null, resObj);
                return;
            } else if(i == 9){
                callback(null, resObj);
                return;
            }
        }
    }

 }


 
 

