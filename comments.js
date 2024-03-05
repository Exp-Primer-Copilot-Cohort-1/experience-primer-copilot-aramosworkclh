// Create web server

var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var querystring = require('querystring');
var comments = [];

http.createServer(function(req, res){
  var urlObj = url.parse(req.url, true);
  var pathname = urlObj.pathname;
  if(pathname === '/'){
    fs.readFile(path.join(__dirname, 'index.html'), function(err, data){
      if(err){
        throw err;
      }
      res.end(data);
    });
  }else if(pathname === '/comment'){
    var comment = urlObj.query;
    comments.push(comment);
    res.end(JSON.stringify(comments));
  }else if(pathname === '/commentData'){
    var comment = '';
    req.on('data', function(chunk){
      comment += chunk;
    });
    req.on('end', function(){
      comment = querystring.parse(comment);
      comments.push(comment);
      res.end(JSON.stringify(comments));
    });
  }else{
    var filePath = path.join(__dirname, pathname);
    fs.readFile(filePath, function(err, data){
      if(err){
        res.writeHead(404, 'Not Found', {'Content-Type': 'text/html'});
        res.end('<h1>404 Not Found</h1>');
      }else{
        res.end(data);
      }
    });
  }
}).listen(8080);
console.log('Server is listening on 8080');
