"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var electron_1 = require("electron");
var files_proxy_1 = require("../proxies/files.proxy");
var fs = require('fs');
var LIST_ROOT = './tmp/mailing_list';
// CREATE
electron_1.ipcMain.handle(files_proxy_1.Channel.SAVE_LIST, function (event, _a) {
    var filename = _a.filename, data = _a.data;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var stringifiedData = JSON.stringify(data, null, 4);
                    var path = LIST_ROOT + "/" + filename + ".json";
                    fs.writeFile(path, stringifiedData, function (err) {
                        if (err) {
                            reject(err);
                        }
                        console.log(filename + " saved into " + LIST_ROOT);
                        resolve({ success: true });
                    });
                })];
        });
    });
});
// READ
electron_1.ipcMain.handle(files_proxy_1.Channel.GET_LISTS, function (event, payload) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var path = "" + LIST_ROOT;
                if (!fs.existsSync(path)) {
                    // create directory
                    fs.mkdirSync(path);
                }
                fs.readdir(path, function (err, files) { return __awaiter(void 0, void 0, void 0, function () {
                    var i, file, _a, _b, error_1;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                if (err) {
                                    return [2 /*return*/, reject(err)];
                                }
                                i = 0;
                                _c.label = 1;
                            case 1:
                                if (!(i < files.length)) return [3 /*break*/, 6];
                                file = files[i];
                                _c.label = 2;
                            case 2:
                                _c.trys.push([2, 4, , 5]);
                                _a = files;
                                _b = i;
                                return [4 /*yield*/, readFileContent(file)];
                            case 3:
                                _a[_b] = _c.sent();
                                return [3 /*break*/, 5];
                            case 4:
                                error_1 = _c.sent();
                                reject(error_1);
                                return [3 /*break*/, 5];
                            case 5:
                                i++;
                                return [3 /*break*/, 1];
                            case 6:
                                resolve(files);
                                return [2 /*return*/];
                        }
                    });
                }); });
            })];
    });
}); });
// Helper reading json content
var readFileContent = function (filename) {
    return new Promise(function (resolve, reject) {
        var path = LIST_ROOT + "/" + filename;
        fs.readFile(path, 'utf8', function (error, data) {
            if (error) {
                reject(error);
            }
            var jsonFileData = {
                filename: filename.replace('.json', ''),
                data: JSON.parse(data)
            };
            resolve(jsonFileData);
        });
    });
};
// DELETE
electron_1.ipcMain.handle(files_proxy_1.Channel.REMOVE_LIST, function (event, _a) {
    var filename = _a.filename;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var path = LIST_ROOT + "/" + filename + ".json";
                    fs.unlink(path, function (error) {
                        if (error) {
                            return reject(error);
                        }
                        return resolve({ msg: 'success' });
                    });
                })];
        });
    });
});
