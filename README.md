Pine push server v2
====================

Features
---------

PM2 + Node.js + RabbitMQ + Node.js(worker) + Push server (Uniqush)


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