'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _utils = require('./utils');

function errorHandling(object, keyPath) {
    var important = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (!object || !keyPath && important) {
        var error = !object ? 'object of undefined' : 'keyPath of undefined';
        throw error;
    }

    if (!(0, _utils.isObject)(object)) {
        var _error = 'object type must be an object not the ' + (typeof object === 'undefined' ? 'undefined' : _typeof(object));
        throw _error;
    }

    if (!(0, _utils.isString)(keyPath) && important) {
        var _error2 = 'keyPath type must be string not the ' + (typeof keyPath === 'undefined' ? 'undefined' : _typeof(keyPath));
        throw _error2;
    }

    if ((0, _utils.isEmptyObject)(object) && important) {
        var _error3 = 'empty object not allowed and didn"t get value from empty object of your keyPath ' + keyPath;
        throw _error3;
    }
    return true;
}

exports.default = errorHandling;