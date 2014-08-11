/*! =========================================================================
 * Express Server for AngularJS web apps v0.1.1
 * Copyright 2014 (c) Pongstr Ordillo. MIT License.
 * ========================================================================= */

'use strict';

var express = require('express')
  , http    = require('http');


var express = require('express')
  , http    = require('http')
  , App     = express();

// Express Server Config
App.set('port', process.env.PORT || 9001);

// Application directories
App.use('/assets',  express.static(__dirname + '/../app/assets'));
App.use('/scripts', express.static(__dirname + '/../app/scripts'));
App.use('/modules', express.static(__dirname + '/../app/modules'));

// 404 Forbidden
// Deny direct access to public directories
App.use('/scripts', function (req, res) {
  res.sendfile('app/error.html');
});

App.use('/modules', function (req, res) {
  res.sendfile('app/error.html');
});

App.use('/assets', function (req, res) {
  res.sendfile('app/error.html');
});

// Let AngularJS handle all routing
App.all('*', function (req, res) {
  res.sendfile('app/index.html');
});

http.createServer(App).listen(App.get('port'), function () {
  console.log('Express serving from http://localhost:' + App.get('port'));
});