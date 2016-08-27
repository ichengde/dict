#!/usr/bin/env node
var http = require('http');
var stream = require('stream');
var crypto = require('crypto');
var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');
var config = require('./lib/config');


var query = function query(queryWord) {
    var options = config.youdao;
    console.log(config.getYoudao);
    // options.path = config.youdao.path + encodeURIComponent(queryWord);

    var body = "";
    var data = function (obj) {
        return obj;
    }
    var req = http.request(options, (res) => {
        res.setEncoding('utf-8');
        res.on('data', (chunk) => {
            body += chunk;
        });

        res.on('end', () => {
            var info = eval(body);
            console.log(info);

            if (info.errno === 0) {
                if (info.baesInfo.symbols !== undefined && info.baesInfo.symbols.length !== 0) {
                    var means = info.baesInfo.symbols[0].parts;
                    means.forEach((key) => {
                        console.log(key.part + ' ' + key.means.join(','));
                    });
                } else {
                    console.log(info.baesInfo.translate_result);
                }
            } else {
                console.log(info.errmsg);
            }
        });
    });

    req.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
    });

    req.end();
}


var run = function (obj) {
    argsLength = Object.keys(obj).length;
    if (argsLength == 1) {
        query(obj[0]);
    }
}

run(process.argv.slice(2));

