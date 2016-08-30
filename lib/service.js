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

    var data = function (obj) {
        return obj;
    };
    var that = this;
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
                    means.forEach((key) => {
                        that.answer += key.part + ' ' + key.means.join(',') + '\n';
                    });
                    proxy.emit('print', that.answer);
                } else {
                    that.answer = info.baesInfo.translate_result;
                }
            } else {
                that.answer = info.errmsg;
            }
        });
    });

    req.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
    });

    req.end();
};

proxy.on('print', function print(answer) {
    console.log(answer);
    that.getRes = true;
});


module.exports = service;
