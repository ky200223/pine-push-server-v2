/**
 * @module pushhandler
 */

/** handle push request
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
exports.handleRequest = function (req, res) {
  console.log(req.body.push_type);

  res.status(200).type('application/json').json({
    result: 'success',
    message: ''
  });
};