#!/usr/bin/env node

var service = require('./lib/service');
var fn = new service();

var run = function (obj) {
	fn.query(obj[0]);
};

run(process.argv.slice(2));

