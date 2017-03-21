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

var SlackBot = require('slackbots');

// create a bot
var bot = new SlackBot({
    token: 'xoxb-157253903859-69pg0ecpMMfjAEY7cDVSTf8S',
    name: 'Bramas_Bot_2'
});

bot.on('start', function() {

    bot.postMessageToChannel('general', 'meow!');

    // define existing username instead of 'user_name'
    bot.postMessageToUser('bramas', 'meow!');

    bot.on('message', function(data) {
        // all ingoing events https://api.slack.com/rtm
        console.log(data);
        if(data.type=='message' && data.channel.charAt(0) == 'D' &&
        !data.bot_id
    ) {
            bot.postMessage(data.channel, 'meow!');
        }
    });

});
