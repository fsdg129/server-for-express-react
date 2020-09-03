const express = require('express');
const https = require('https');
const http = require('http');
const app = express();
const fs = require('fs');

const HTTP_PORT = process.env.HTTP_PORT || 3000;
const HTTPS_PORT = process.env.HTTPS_PORT || 3443;
const MODE = process.env.MODE || "LOCAL";
const KEY_NAME = process.env.KEY_NAME || 'frontendkey.pem';
const CERT_NAME = process.env.CERT_NAME || 'frontendcert.pem';

var options = {
	key: fs.readFileSync('./static/' + KEY_NAME),
	cert: fs.readFileSync('./static/' + CERT_NAME)
  };

app.use((req, res, next) => {

	if (req.secure || req.headers['x-forwarded-proto'] == 'https'){
		return next();
	} else{
		if(MODE == 'LOCAL'){
			return res.redirect('https://localhost:3443' + req.url);
		} else{
			return res.redirect('https://' + req.headers.host + req.url);
		}
	}

});

app.get('/bundle.js', function( req, res ) {
	res.sendFile(__dirname+"/dist/bundle.js");
});

app.get('/*', function( req, res ) {
	res.sendFile(__dirname+"/static/index.html");
});

http.createServer(app).listen( HTTP_PORT, function() {
    console.log( 'http listening on *:' + HTTP_PORT );
});

https.createServer(options, app).listen( HTTPS_PORT, function() {
    console.log( 'https listening on *:' + HTTPS_PORT );
});