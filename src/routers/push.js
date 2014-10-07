var info = require('debug')('info:routers:push');
var router = require('express').Router();
var rabbitmq = require(SOURCE_ROOT + '/modules/rabbitmq/rabbitmq.js');

/**
 * @module routers/push
 * @description /push router
 */


/** register push service
 * @name POST /push/register Handler
 * @function
 * @memberOf module:routers/push
 * @example
 * Request type='application/json'
 * {
 *   device_name:  (required, String),
 *   device_type:  (required, String - ios, android),
 *   device_id:    (required, String, gcm reg_id or apns token)
 * }
 *
 * RabbitMQ Request
 * {
 *    type: "/push/register",
 *    data: {
 *      ...
 *    }
 * }
 *
 * If success, response status is 200
 * If error, response is below:
 *
 * Response type='application/json'
 * {
 *   'errors': [{
 *     'message': 'Error occurred', 'code': 1
 *   }]
 * }
 */
router.post('/register', function (req, res) {
  var DeviceType = {android: 1, ios: 2};

  var body = req.body;

  // check required parameters
  if (body.device_name === undefined) {res.status(400).send(getErrorResponse(10, 'device_name')); return;}
  if (body.device_type === undefined) {res.status(400).send(getErrorResponse(10, 'device_type')); return;}
  if (body.device_id === undefined) {res.status(400).send(getErrorResponse(10, 'device_id')); return;}

  // check valid device_type
  if (!(body.device_type in DeviceType)) {res.status(400).send(getErrorResponse(20, 'device_type')); return;}

  var delivery = {
    type: req.originalUrl,
    data: {
      device_name: body.device_name,
      device_type: body.device_type,
      device_id: body.device_id
    }
  };
  rabbitmq.push.write(JSON.stringify(delivery), 'utf8');
  info('Write to MQ: ' + JSON.stringify(delivery));
  res.status(200).end();
});

/** push message request handler
 * @name POST /push/message Handler
 * @function
 * @memberOf module:routers/push
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
 * Client Request
 * {
 *    device_name:  (required, String),
 *    push_type:    (required, Number),
 *    push_badge:   (optional, Number),
 *    push_message: (required, String),
 *    event_date:   (required, String, ex. '2014-08-14T13:28:02+09:00'),
 *    image_url:    (required, String),
 *    summary:      (required, String),
 *    thread_id:    (optional, Number),
 *    comment_id:   (optional, Number)
 * }
 *
 * RabbitMQ Request
 * {
 *    type: "/push/message",
 *    data: {
 *      ...
 *    }
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
router.post('/message', function (req, res) {
  var body = req.body;

  // check required keys
  if (body.device_name === undefined) {res.status(400).send(getErrorResponse(10, 'device_name')); return;}
  if (body.push_type === undefined) {res.status(400).send(getErrorResponse(10, 'push_type')); return;}
  if (body.push_message === undefined) {res.status(400).send(getErrorResponse(10, 'push_message')); return;}
  if (body.event_date === undefined) {res.status(400).send(getErrorResponse(10, 'event_date')); return;}
  if (body.image_url === undefined) {res.status(400).send(getErrorResponse(10, 'image_url')); return;}
  if (body.summary === undefined) {res.status(400).send(getErrorResponse(10, 'summary')); return;}

  // check optional keys
  body.push_badge = body.push_badge !== undefined ? body.push_badge : 1;
  body.thread_id = body.thread_id !== undefined ? body.thread_id : '';
  body.comment_id = body.comment_id !== undefined ? body.comment_id : '';

  var delivery = {
    type: req.originalUrl,
    data: {
      device_name: body.device_name,
      push_type: body.push_type,
      push_badge: body.push_badge,
      push_message: body.push_message,
      event_date: body.event_date,
      image_url: body.image_url,
      summary: body.summary,
      thread_id: body.thread_id,
      comment_id: body.comment_id
    }
  };
  rabbitmq.push.write(JSON.stringify(delivery), 'utf8');
  info('Write to MQ: ' + JSON.stringify(delivery));
  res.status(200).end();
});

/** Make error response object
 * @private
 * @function
 * @param errorCode
 * @param param Used for additional error description
 * @returns {{message: string, code: (Number)}}
 */
function getErrorResponse(errorCode, param) {
  var message = 'Response error code does not detected';
  param = param !== undefined ? param : ' ';

  switch (errorCode) {
    case 10: message = 'Required parameter (' + param + ') is not defined'; break;
    case 20: message = 'Parameter (' + param + ') is invalid'; break;
  }
  return {
    message: message,
    code: errorCode
  }
}


module.exports = router;