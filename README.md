Pine push server v2
====================

Features
---------

PM2 + Node.js + RabbitMQ + Node.js(worker) + Push server (Uniqush-push)


Generate documentation
-----------------------

    $ npm install jsdoc
    $ ./node_modules/.bin/jsdoc --destination docs --recurse src/
    
    Run docs/index.htm on your browser!
    
    
Test
-----

    $ export PUSH_SERVER_TEST=true && mocha --reporter nyan --require global.js $(find ./test -name '*test.js') 


Run
----

    $ export PUSH_SERVER_ENV=local (or dev, production)
    
    $ export PUSH_SERVER_ENV=local && export DEBUG=info:*,warn:*,error:* && node bin/www
    
    
Request examples
-----------------

    Request type='application/json'
    {
      push_type:    (required, Number),
      push_badge:   (optional, Number),
      push_message: (required, String),
      event_date:   (required, String, ex. '2014-08-14T13:28:02+09:00'),
      image_url:    (required, String),
      summary:      (required, String),
      thread_id:    (optional, Number),
      comment_id:   (optional, Number)
    }
    
    If success, response status is 200
    If error, response is below:
    
    Response type='application/json'
    {
     'errors': [{
       'message': 'Error occurred', 'code': 1
     }]
    }


Error codes
------------

| Code | Text                                | Description                                                           |
|:----:| ----------------------------------- | --------------------------------------------------------------------- |
| 10   | Required key is not defined         | Should define required parameters                                     |