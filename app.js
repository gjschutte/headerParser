var express = require('express');
var parser = require('ua-parser-js');
var app = express();

app.set('port', process.env.PORT || 8081);

app.get('/', function (req, res) {

    /* Detect OS */
    var userAgent = parser(req.headers['user-agent']);
    var os = userAgent.os.name + " " + userAgent.os.version;
    
    /* Detect IP */
    var ip = req.headers['x-forwarded-for'].split(',').pop() ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
        
    /* Detect Language */
    var language = req.headers["accept-language"].split(',')[0];
    
    console.log("IP : " + ip);
    console.log ("os : " + os);
    console.log("Language : " + language);

    /* Make return-object */
    var retObject = {
        "ip-address": ip,
        "language": language,
        "OS": os
    };

    res.send(retObject);
});

/* Prevent a favicon not found. Send 204 - no content */
app.get('/favicon.ico', function (req, res) {
    res.status(204);
});


app.listen(8081, function() {
    console.log('Example app running');
});


