var assert = require('assert'),
    getUrlData = require('index');

getUrlData({uri: "https://github.com/"}, function (err, data) {
        assert.ok(data);
    }
);