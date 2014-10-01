var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Push type list
 *
 * 10 : new thread posted
 * 11 : new comment posted
 * 12 : new comment on commented thread
 *
 * 20 : someone stars your thread
 * 21 : someone stars your comment
 *
 * Request
 * {
 *    push_type:    (int),
 *    push_badge:   (String),
 *    push_message: (String),
 *    event_date:   (String),
 *    image_url:    (String),
 *    summary:      (String),
 *    thread_id:    (String),
 *    comment_id:   (String)
 * }
 *
 * Response
 *
 * Success status code 200
 *
 * Error messages
 *
 * {
 *    'errors': [{
 *      'message': 'Error occurred', 'code': 1
 *    }]
 * }
 */
app.use('/push', function(req, res) {
  res.status(200).type('application/json').json({
    result: 'success',
    message: ''
  });
});







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
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
