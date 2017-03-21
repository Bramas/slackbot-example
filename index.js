var express = require('express');
var axios = require('axios');
 
var app = express(); 
app.set('port', (process.env.PORT || 5000));

  app.use(express.static(__dirname + '/public'));  




var CD = require('./cloudsight');

app.get('/label', function(req, res) {
    console.log(req.query.url);

    CD(req.query.url,
    function(label) {
        res.end('{"label":"'+ label+'"}');
    } , function(err) {
        res.end('{"error": true}');
    });
})



app.listen(app.get('port'), function() { 
       console.log('Node app is running on port', app.get('port'));
 });
