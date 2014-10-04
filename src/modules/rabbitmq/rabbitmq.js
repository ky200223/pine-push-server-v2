var config = require(PROJECT_ROOT + '/src/config.js');
var async = require('async');

var info = require('debug')('info:rabbitmq');
var rabbit = require('rabbit.js');


/**
 * @module rabbitmq
 */

var context, push, worker;

/** Connect rabbitmq, push socket, worker socket
 * <br>Connection success, you can access <b>rabbitmq.push</b>, <b>rabbitmq.worker</b>.
 * <br>If failed, push or worker is undefined or close (First access fail is undefined, after is null)
 * @function
 * @param callback {function} callback function
 */
exports.connect = function (callback) {
  async.series([
    closeSockets,
    createContext,
    connectPush,
    connectWorker
  ], function (err, results) {
    if (err) throw err;
    callback();
  });

  function closeSockets(next) {
    if (push) {
      push.close();
      exports.push = push = null;
    }
    if (worker) {
      worker.close();
      exports.worker = worker = null;
    }
    if (context) context.close();
    next();
  }

  function createContext(next) {
    context = rabbit.createContext(config.AMQP_HOST);
    context.on('ready', function () {
      info('RabbitMQ is connected.');
      next();
    });
  }

  function connectPush(next) {
    exports.push = push = context.socket('PUSH');
    push.connect(config.AMQP_QUEUE_NAME, function () {
      info('Push socket connected.');
      next();
    });
  }

  function connectWorker(next) {
    exports.worker = worker = context.socket('WORKER');
    worker.connect(config.AMQP_QUEUE_NAME, function () {
      info('Worker socket connected.');
      next();
    });
  }
};