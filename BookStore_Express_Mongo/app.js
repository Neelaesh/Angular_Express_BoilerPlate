var express = require('express');
var bodyparser = require('body-parser');
var cors = require('cors');
var logger = require('morgan');
var favicon = require('serve-favicon');
var path = require('path');
var config = require('./Configurations/config');
var bookStoreRoutes = require('./Routes/booksRouter');

var app = express();

app.use(cors());
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use('/books', bookStoreRoutes);

app.listen(config.port,()=>{
    console.log("Server listening on port ",config.port);
})