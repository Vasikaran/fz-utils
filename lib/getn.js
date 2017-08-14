'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _findNestedValue = require('./common/findNestedValue');

var _findNestedValue2 = _interopRequireDefault(_findNestedValue);

var _utils = require('./common/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getn(object, keyPath) {
    var option = {
        type: 'GET_VALUE'
    };
    var newObject = (0, _utils.nonMutateData)(object);
    return (0, _findNestedValue2.default)(newObject, keyPath, option);
}

exports.default = getn;