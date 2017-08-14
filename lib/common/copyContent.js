'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var removeDirectory = function removeDirectory(dirPath) {
    _fs2.default.readdirSync(dirPath).forEach(function (fileOrDir) {
        fileOrDir = _path2.default.join(dirPath, fileOrDir);
        if (_fs2.default.statSync(fileOrDir).isDirectory()) {
            removeDirectory(fileOrDir);
        } else {
            _fs2.default.unlinkSync(fileOrDir);
        }
    });
};

var copyFile = function copyFile(srcPath, targetPath) {
    var isCopy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    var readStream = _fs2.default.createReadStream(srcPath);
    var writeStream = _fs2.default.createWriteStream(targetPath);
    readStream.pipe(writeStream);
    if (!isCopy) {
        try {
            _fs2.default.unlinkSync(fileOrDir);
        } catch (err) {
            process.stdout.write(err);
        }
    }
};

var iterateDirectory = function iterateDirectory(srcPath, targetPath, isCopy, extension) {
    _fs2.default.readdirSync(srcPath).forEach(function (fileOrDir) {
        var fromPath = _path2.default.join(srcPath, fileOrDir);
        var toPath = _path2.default.join(targetPath, fileOrDir);
        if (_fs2.default.statSync(fromPath).isDirectory()) {
            if (!_fs2.default.existsSync(toPath)) {
                _fs2.default.mkdirSync(toPath);
            }
            iterateDirectory(fromPath, toPath, isCopy, extension);
        } else {
            if (extension) {
                var _path$parse = _path2.default.parse(fromPath),
                    ext = _path$parse.ext;

                if (ext === extension) {
                    copyFile(fromPath, toPath, isCopy);
                }
            } else {
                copyFile(fromPath, toPath, isCopy);
            }
        }
    });
};

var copyContent = function copyContent(srcPath, targetPath, isCopy, ext) {
    if (_fs2.default.statSync(srcPath).isDirectory()) {
        var _path$parse2 = _path2.default.parse(srcPath),
            name = _path$parse2.name;

        var originPath = _path2.default.join(targetPath, name);
        if (!_fs2.default.existsSync(originPath)) {
            _fs2.default.mkdirSync(originPath);
        }
        iterateDirectory(srcPath, originPath, isCopy, ext);
    } else {
        copyFile(srcPath, targetPath, isCopy);
    }
    if (!isCopy) {
        removeDirectory(srcPath);
    }
};

exports.default = copyContent;