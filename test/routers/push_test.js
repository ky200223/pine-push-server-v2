var config = require(PROJECT_ROOT + '/config.js');
var chai = require('chai');
var http = require('http');
var request = require('request');
var moment = require('moment');

describe('INTEGRATION TEST: src/routers/push.js', function() {
  var should = chai.should();
  describe('POST /push/message', function() {
    var options = {
      hostname: config.HOSTNAME,
      port: config.PORT,
      path: '/push/message',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    it('should return 200', function(done) {
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

  describe('POST /push/register', function() {
    it('should return 200', function(done) {
      var options = {
        hostname: config.HOSTNAME,
        port: config.PORT,
        path: '/push/register',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      var req = http.request(options, function(res) {
        res.statusCode.should.equal(200);
        done();
      });
      req.write(JSON.stringify({
        device_name: 'namhoon',
        device_type: 'android',
        device_id: 'APA91bHcPxD-dSqk0qNu7RMSlBjO-DqJtcUzofa6dLU76IEArprvlfq7X82oHeIRNDxfyTOtYufnqHTTUBx4QS8U7ESaWpha2UGan2U06k9r1p-0x-cJrl22OpV0CMvs2cJq4KRreqtU_r8b-zIkNhys9phy0c7mpDVjA06if531VeIuJ5yQL6c'
      }));
      req.end();
    });

    it('should return 400 when device_type is malformed.', function(done) {
      var options = {
        url: config.BASE_URL + '/push/register',
        method: 'POST',
        json: {
          device_name: 'namhoon',
          device_type: 'namdroid',
          device_id: 'APA91bHcPxD-dSqk0qNu7RMSlBjO-DqJtcUzofa6dLU76IEArprvlfq7X82oHeIRNDxfyTOtYufnqHTTUBx4QS8U7ESaWpha2UGan2U06k9r1p-0x-cJrl22OpV0CMvs2cJq4KRreqtU_r8b-zIkNhys9phy0c7mpDVjA06if531VeIuJ5yQL6c'
        }
      };
      request(options, function (err, res, body) {
        if (err) throw err;
        res.statusCode.should.equal(400);
        body.code.should.equal(20);
        done();
      });
    });
  });
});