var config = require(SOURCE_ROOT + '/config.js');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var pushHandler = require(SOURCE_ROOT + '/handlers/pushhandler.js');

var app = express();

if (config.env != 'production') app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/push/dev', pushHandler.handleRequest);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500).type('application/json').json({
        message: err.message,
        error: {}
      });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500).type('application/json').json({
        message: err.message,
        error: {}
    });
});


module.exports = app;
