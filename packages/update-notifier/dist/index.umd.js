(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.updateNotifier = {}));
})(this, (function (exports) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
    }

    function greenlet(e){var n=0,t={},a=URL.createObjectURL(new Blob(["$$="+e+";onmessage="+function(e){Promise.resolve(e.data[1]).then(function(e){return $$.apply($$,e)}).then(function(n){postMessage([e.data[0],0,n],[n].filter(function(e){return e instanceof ArrayBuffer||e instanceof MessagePort||self.ImageBitmap&&e instanceof ImageBitmap}));},function(n){postMessage([e.data[0],1,""+n]);});}])),o=new Worker(a);return o.onmessage=function(e){t[e.data[0]][e.data[1]](e.data[2]),t[e.data[0]]=null;},function(e){return e=[].slice.call(arguments),new Promise(function(){t[++n]=arguments,o.postMessage([n,e],e.filter(function(e){return e instanceof ArrayBuffer||e instanceof MessagePort||self.ImageBitmap&&e instanceof ImageBitmap}));})}}

    function useNotification(params) {
        var _this = this;
        var regex = new RegExp("".concat(params.key, "\\s*=\\s*['\"]([^'\"]+)['\"]"));
        var timer;
        var useCreateNotify = function (notice) { return new CustomEvent("siteUpdate", {
            bubbles: true,
            detail: { data: notice }
        }); };
        var getCurrentHash = function () {
            var body = document.querySelector('body');
            if (!body)
                return false;
            var hash = body.getAttribute('data-hash');
            return hash;
        };
        var currentHash = getCurrentHash();
        var requestHash = function () { return __awaiter(_this, void 0, void 0, function () {
            var res, data, matchResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("".concat(window.origin + (params.rootPath || ''), " ?t=").concat(Date.now()))];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.text()];
                    case 2:
                        data = _a.sent();
                        matchResult = data.match(regex);
                        return [2 /*return*/, matchResult ? matchResult[2] : null];
                }
            });
        }); };
        var queryNewHash = greenlet(params.request || requestHash);
        var initEvent = function () {
            window.addEventListener('load', windowLoaded);
            document.addEventListener('visibilitychange', handleVisibilityChange);
        };
        var handleVisibilityChange = function () { return __awaiter(_this, void 0, void 0, function () {
            var hash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(document.visibilityState === 'visible')) return [3 /*break*/, 2];
                        return [4 /*yield*/, queryNewHash()];
                    case 1:
                        hash = _a.sent();
                        if (hash !== currentHash) {
                            dispatchEvent(true);
                        }
                        else {
                            initTimer();
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        clearInterval(timer);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        var windowLoaded = function () { return __awaiter(_this, void 0, void 0, function () {
            var hash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryNewHash()];
                    case 1:
                        hash = _a.sent();
                        if (hash !== currentHash) {
                            dispatchEvent(true);
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        var dispatchEvent = function (status) {
            var notice = useCreateNotify(status);
            window.dispatchEvent(notice);
        };
        var initTimer = function () {
            timer = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                var hash;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, queryNewHash()];
                        case 1:
                            hash = _a.sent();
                            if (hash !== currentHash) {
                                dispatchEvent(true);
                            }
                            return [2 /*return*/];
                    }
                });
            }); }, params.delay);
        };
        if (!currentHash)
            return;
        initEvent();
        initTimer();
    }

    exports.useNotification = useNotification;

}));
