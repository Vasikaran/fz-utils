'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _utils = require('./common/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var callback = function callback(resolve) {
    return function (res) {
        res.setEncoding('utf8');
        var str = '';

        res.on('data', function (chunk) {
            str += chunk;
        });

        res.on('end', function () {
            resolve({
                body: str,
                response: res
            });
        });

        res.on('error', function (err) {
            process.stdout.write(err);
        });
    };
};

var request = function request(options) {
    return new Promise(function (resolve, reject) {
        var _url$parse = _url2.default.parse(options.url),
            protocol = _url$parse.protocol,
            hostname = _url$parse.hostname,
            path = _url$parse.path,
            port = _url$parse.port;

        var _options$method = options.method,
            method = _options$method === undefined ? 'GET' : _options$method,
            _options$headers = options.headers,
            headers = _options$headers === undefined ? {} : _options$headers,
            _options$payload = options.payload,
            payload = _options$payload === undefined ? {} : _options$payload;

        var newOptions = {
            host: hostname,
            port: port,
            path: path,
            method: method,
            headers: headers
        };
        var req = void 0;

        if (protocol === 'https:') {
            req = _https2.default.request(newOptions, callback(resolve));
        } else if (protocol === 'http:') {
            req = _http2.default.request(newOptions, callback(resolve));
        }

        if (method.toUpperCase() === 'POST') {
            if ((0, _utils.isObject)(payload) || (0, _utils.isArray)(payload)) {
                payload = JSON.stringify(payload);
            }
            req.write(payload);
        }
        req.end();
    });
};

exports.default = request;