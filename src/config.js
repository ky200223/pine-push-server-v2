var env = process.env.PUSH_SERVER_ENV || 'local';
var test = process.env.PUSH_SERVER_TEST || 'false';

/**
 * @module {object} config
 */

/**
 * AMQP host - amqp://localhost
 * @type {string}
 */
exports.AMQP_HOST = 'amqp://localhost';

/**
 * AMQP queue name - <b>'push'</b>
 * <br>If you exports PUSH_SERVER_TEST=true, queue name is <b>'push_test'</b>
 * @type {string}
 */
exports.AMQP_QUEUE_NAME = 'push';
if (test) exports.AMQP_QUEUE_NAME = 'push_test';