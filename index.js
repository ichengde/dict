#!/usr/bin/env node

var service = require('./lib/service');

var run = function (obj) {
	service.query(obj,function(answer){
		console.log(answer);
	});
};

run(process.argv.slice(2).join(' '));

