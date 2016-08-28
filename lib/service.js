var http = require('http');
var config = require('./config');

function service() {

}

service.prototype.query = function query(queryWord) {
    var options = config.youdao;
    options.path = config.youdao.path + encodeURIComponent(queryWord);

    var body = '';
    var data = function (obj) {
        return obj;
    };
    var req = http.request(options, (res) => {
        res.setEncoding('utf-8');
        res.on('data', (chunk) => {
            body += chunk;
        });

        res.on('end', () => {
            var info = eval(body);

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
};

module.exports = service;