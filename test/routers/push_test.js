var config = require(SOURCE_ROOT + '/config.js');
var chai = require('chai');
var http = require('http');
var moment = require('moment');

describe('INTEGRATION TEST: src/routers/push.js', function() {
  var should = chai.should();
  describe('POST /push/dev', function() {
    var options = {
      hostname: config.HOSTNAME,
      port: config.PORT,
      path: '/push/dev',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    it('push test should return 200', function(done) {
      var req = http.request(options, function(res) {
        res.statusCode.should.equal(200);
        done();
      });
      req.write(JSON.stringify({
        push_type: 10,
        push_message: 'test_message',
        event_date: moment().format(),
        image_url: 'test_image.png',
        summary: 'test summary'
      }));
      req.end();
    });
  });
});