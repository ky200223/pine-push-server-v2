var rabbitmq = require(SOURCE_ROOT+'/modules/rabbitmq/rabbitmq.js');

describe('INTEGRATION TEST: src/modules/rabbitmq/rabbitmq.js', function() {
  describe('#connect', function() {
    it('Can connect and can push mq', function(done) {
      rabbitmq.connect(function () {
        rabbitmq.push.write('test connection');
        done();
      });
    });
  });
});