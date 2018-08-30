var express = require('express');
var app = express();
// var User = require('./models/models.js')
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var url = "mongodb://localhost:27017/demo111";
var a = mongoose.connect(url,{useMongoClient:true});

app.use(bodyParser.json({limit: '50mb'})); // support json encoded bodies
app.use(bodyParser.urlencoded({limit: '50mb', extended: true })); // support encoded bodies

//Home Page
var routes = require('./routes/routes.js');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/', routes);


app.listen(3007);

module.exports = app;