var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/** handler push request
 * @name push handler
 * @function
 * @example
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
 *    push_type:    (Number),
 *    push_badge:   (Number),
 *    push_message: (String),
 *    event_date:   (String, ex. '2014-08-14 13:28:02'),
 *    image_url:    (String),
 *    summary:      (String),
 *    thread_id:    (Number),
 *    comment_id:   (Number)
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
app.post('/push/dev', function(req, res) {
  console.log(req.body.push_type);

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
