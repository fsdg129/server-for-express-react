var app = require('express')();
var http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

app.get('/bundle.js', function( req, res ) {
	res.sendFile(__dirname+"/dist/bundle.js");
});

app.get('/*', function( req, res ) {
	res.sendFile(__dirname+"/index.html");
});

http.listen( PORT, function() {
    console.log( 'listening on *:' + PORT );
});