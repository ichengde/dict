var assert = require("assert");
describe('query', function () {
    describe('#word', function () {
        it('should query word success', function () {
            var service = require('../lib/service');
            service.query('word');
            var q = service.getRes;
            process.nextTick(function () {
                assert.equal(true, q);
            });
        });
    });
});
