#!/usr/bin/env node

var service = require('./lib/service');

var run = function (obj) {
	service.query(obj[0]);
};

run(process.argv.slice(2));

