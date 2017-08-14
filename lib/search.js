'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _arguments = arguments;

var _utils = require('./common/utils');

var _errorHandling = require('./common/errorHandling');

var _errorHandling2 = _interopRequireDefault(_errorHandling);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var deepValues = {};

var searchInObj = function searchInObj(object, key) {
    if ((0, _errorHandling2.default)(object, key)) {
        var keys = Object.keys(object);
        var keyPath = _arguments[2] ? _arguments[2] : '';
        if (keys.indexOf(key) !== -1) {
            if (keyPath !== '') {
                keyPath += '.';
            }
            deepValues[keyPath + key] = object[key];
        }

        keys.forEach(function (objectKey) {
            if (object[objectKey]) {
                var path = keyPath;
                if ((0, _utils.isObject)(object[objectKey])) {
                    if (path !== '' && !path.endsWith('.')) {
                        path += '.';
                    }
                    path += objectKey;
                    search(object[objectKey], key, path);
                }
            }
        });
        return deepValues;
    }
};

var search = function search(object, key) {
    var newObject = (0, _utils.nonMutateData)(object);
    return searchInObj(newObject, key);
};

exports.default = search;