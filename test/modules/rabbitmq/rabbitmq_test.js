var rabbitmq = require(SOURCE_ROOT+'/modules/rabbitmq/rabbitmq.js');

describe('INTEGRATION TEST: src/modules/rabbitmq/rabbitmq.js', function() {
  describe('#connect', function() {
    it('Can connect and can push mq', function(done) {
      rabbitmq.connect(function () {
        rabbitmq.push.write('{"push_type":10,"push_badge":1,"push_message":"test_message","event_date":"2014-10-06T19:36:32+09:00","image_url":"test_image.png","summary":"test summary","thread_id":1,"comment_id":1}');
        done();
      });
    });
  });
});