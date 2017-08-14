'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _copyContent = require('./common/copyContent');

var _copyContent2 = _interopRequireDefault(_copyContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function move(srcPath, targetPath) {
    var isCopy = false;
    (0, _copyContent2.default)(srcPath, targetPath, isCopy);
}

exports.default = move;