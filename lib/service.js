var http = require('http');
var config = require('./config');
var events = require('events');
var util = require('util');

function service() {
    events.EventEmitter.call(this);
    service.getRes = false;
}
util.inherits(service, events.EventEmitter);

var proxy = new events.EventEmitter();

service.query = function query(queryWord, callback) {
    this.answer = '';
    var body = '';
    var options = config.youdao;
    options.path = config.youdao.path + encodeURIComponent(queryWord);

    proxy.on('print', function (answer) {
        callback(answer);
    });
    var that = this;
    var data = function (obj) {
        return obj;
    };
    var req = http.request(options, function (res) {
        res.setEncoding('utf-8');
        res.on('data', function (chunk) {
            body += chunk;
        });

        res.on('end', function () {
            var info = eval(body);

            if (info.errno === 0) {
                if (info.baesInfo.symbols !== undefined && info.baesInfo.symbols.length !== 0) {
                    var means = info.baesInfo.symbols[0].parts;
                    var meansMap = [];
                    means.forEach((key) => {
                        meansMap.push(key.part + ' ' + key.means.join(','));
                    });
                    that.answer = meansMap.join('\n');
                } else {
                    that.answer = 'no means';
                }

                if (info.baesInfo.translate_result !== undefined) {
                    that.answer = info.baesInfo.translate_result;
                }
            } else {
                that.answer = info.errmsg;
            }

            proxy.emit('print', that.answer);
        });

    });

    req.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
    });

    req.end();
};


module.exports = service;
