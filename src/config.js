var env = process.env.PUSH_SERVER_ENV || 'local';
var test = process.env.PUSH_SERVER_TEST || 'false';
if (env != 'local' && env != 'dev' && env != 'production') console.error('PUSH_SERVER_ENV should be one of local, dev, production.');

/**
 * @module {object} config
 */



/**
 * env = local or dev or production
 * <br> You can set env by 'export PUSH_SERVER_ENV=local' in bash
 * @type {string}
 */
exports.env = process.env.PUSH_SERVER_ENV || 'local';

/**
 * Hostname - '127.0.0.1'
 * @type {string}
 */
exports.HOSTNAME = '127.0.0.1';

/**
 * Port - default 8500
 * @type {number}
 */
exports.PORT = 8500;

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
