var path = require('path');

PROJECT_ROOT = path.dirname(__filename);
SOURCE_ROOT = PROJECT_ROOT + '/src';

// Set debugger
var debug = require('debug');
var info = debug('info:');
info.log = console.log.bind(console);
var warn = debug('warn:');
warn.log = console.warn.bind(console);
var error = debug('error:');
error.log = console.error.bind(console);
