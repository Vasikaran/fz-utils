'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var isObject = function isObject(object) {
    if (object) {
        return object.toString() === '[object Object]' ? true : false;
    }
    return false;
};

var isEmptyObject = function isEmptyObject(object) {
    return JSON.stringify(object) === '{}' ? true : false;
};

var isArray = function isArray(array) {
    return Array.isArray(array) ? true : false;
};

var isString = function isString(string) {
    return typeof string === 'string' ? true : false;
};

var isNumber = function isNumber(number) {
    return Number(number) ? true : false;
};

var stringHasValue = function stringHasValue(string, value) {
    return string.search(value) !== -1 ? true : false;
};

var hasValue = function hasValue(object, key) {
    return object[key] ? true : false;
};

var getValueFromObject = function getValueFromObject(object, key) {
    return object[key];
};

var nonMutateData = function nonMutateData(data) {
    var newData = void 0;
    if (isObject(data)) {
        newData = Object.assign({}, data);
    } else if (isArray(data)) {
        newData = data.slice();
    } else {
        newData = data;
    }
    return data;
};

exports.isObject = isObject;
exports.isEmptyObject = isEmptyObject;
exports.isArray = isArray;
exports.isString = isString;
exports.isNumber = isNumber;
exports.stringHasValue = stringHasValue;
exports.hasValue = hasValue;
exports.getValueFromObject = getValueFromObject;
exports.nonMutateData = nonMutateData;