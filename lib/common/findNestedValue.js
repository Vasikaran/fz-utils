'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('./utils');

var _errorHandling = require('./errorHandling');

var _errorHandling2 = _interopRequireDefault(_errorHandling);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findNestedValue(object, keyPath, option) {
    if ((0, _errorHandling2.default)(object, keyPath, true)) {
        var keys = keyPath.split('.');
        var key = keys[0];
        var checkedPath = arguments[3] ? arguments[3] + '.' + key : key;
        keys.splice(0, 1);
        keys = keys.join('.');
        var value = (0, _utils.getValueFromObject)(object, key);

        if (!(0, _utils.stringHasValue)(keyPath, '.')) {
            if (option.type === 'SET_VALUE') {
                object[keyPath] = option.value;
                return;
            } else if (option.type === 'GET_VALUE') {
                if ((0, _utils.hasValue)(object, keyPath)) {
                    return (0, _utils.getValueFromObject)(object, keyPath);
                } else {
                    var error = 'there is no value from your keyPath ' + keyPath;
                    throw error;
                }
            }
        }

        if (value) {
            if ((0, _utils.isObject)(value)) {
                return findNestedValue(value, keys, option, checkedPath);
            } else {
                if (option.type === 'SET_VALUE') {
                    object[key] = option.value;
                    return;
                } else if (option.type === 'GET_VALUE') {
                    return value;
                }
            }
        } else {
            if (keys !== '') {
                var _error = checkedPath + ' of undefined';
                throw _error;
            }
        }
    }
}

exports.default = findNestedValue;