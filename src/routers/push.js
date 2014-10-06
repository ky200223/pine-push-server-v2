var info = require('debug')('info:routers:push');
var router = require('express').Router();
var rabbitmq = require(SOURCE_ROOT + '/modules/rabbitmq/rabbitmq.js');

// todo /push/register

/**
 * @module Push router
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
 *    push_type:    (required, Number),
 *    push_badge:   (optional, Number),
 *    push_message: (required, String),
 *    event_date:   (required, String, ex. '2014-08-14 13:28:02'),
 *    image_url:    (required, String),
 *    summary:      (required, String),
 *    thread_id:    (optional, Number),
 *    comment_id:   (optional, Number)
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

// Check request paramters.
// If required parameter undefined, it returns error.
router.post('/message', function (req, res) {
  var body = req.body;

  // check required keys
  if (body.push_type === undefined) {res.status(400).json({message:'Required key(push_type) is not defined', code: 10}); return;}
  if (body.push_message === undefined) {res.status(400).json({message:'Required key(push_message) is not defined', code: 10}); return;}
  if (body.event_date === undefined) {res.status(400).json({message:'Required key(event_date) is not defined', code: 10}); return;}
  if (body.image_url === undefined) {res.status(400).json({message:'Required key(image_url) is not defined', code: 10}); return;}
  if (body.summary === undefined) {res.status(400).json({message:'Required key(summary) is not defined', code: 10}); return;}

  // check optional keys
  body.push_badge = body.push_badge !== undefined ? body.push_badge : 1;
  body.thread_id = body.thread_id !== undefined ? body.thread_id : '';
  body.comment_id = body.comment_id !== undefined ? body.comment_id : '';

  var message = {
    push_type: body.push_type,
    push_badge: body.push_badge,
    push_message: body.push_message,
    event_date: body.event_date,
    image_url: body.image_url,
    summary: body.summary,
    thread_id: body.thread_id,
    comment_id: body.comment_id
  };
  rabbitmq.push.write(JSON.stringify(message), 'utf8');
  info('Write to MQ: ' + JSON.stringify(message));
  res.status(200).end();
});


module.exports = router;