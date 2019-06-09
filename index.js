"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var _this = this;
exports.__esModule = true;
var puppeteer = require("puppeteer");
// check for sufficient command line arguments
if (process.argv.length < 4) {
    console.log('You did not provide enough arguments to the program');
    process.exit();
}
var credentials = {
    id: process.argv[2],
    pw: process.argv[3]
};
var urlLoginPage = 'https://nid.naver.com/nidlogin.login';
var urlBlogDashboard = 'https://section.blog.naver.com/BlogHome.nhn?directoryNo=0&currentPage=1&groupId=0';
var sleep = function (ms) {
    if (ms === void 0) { ms = 0; }
    return new Promise(function (r) { return setTimeout(r, ms); });
};
(function () { return __awaiter(_this, void 0, void 0, function () {
    var browser, page, viewport, fillLoginPage, err, switchToMyComments, getMyComments, commentLinks, _i, commentLinks_1, commentLink, commentID, frame, findComment;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, puppeteer.launch({ headless: false })];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                viewport = { width: 1000, height: 1000 };
                page.setViewport(viewport);
                page.on('dialog', function (dialog) {
                    console.log("dialog");
                    dialog.accept();
                });
                return [4 /*yield*/, page.goto(urlLoginPage, { waitUntil: 'networkidle2' })];
            case 3:
                _a.sent();
                return [4 /*yield*/, page.evaluate(function (cred) {
                        var id = document.getElementById('id');
                        if (id === null)
                            return new Error('Input for id could not be found');
                        id.value = cred.id;
                        var pw = document.getElementById('pw');
                        if (pw === null)
                            return new Error('Input for pw could not be found');
                        pw.value = cred.pw;
                        return null;
                    }, credentials)];
            case 4:
                fillLoginPage = _a.sent();
                err = fillLoginPage;
                if (err != null) {
                    console.log(err.message);
                    browser.close();
                    process.exit();
                }
                return [4 /*yield*/, sleep(15000)];
            case 5:
                _a.sent();
                return [4 /*yield*/, page.screenshot({ path: 'example1.png' })];
            case 6:
                _a.sent();
                return [4 /*yield*/, page.goto(urlBlogDashboard, { waitUntil: 'networkidle2' })];
            case 7:
                _a.sent();
                return [4 /*yield*/, page.screenshot({ path: 'example2.png' })];
            case 8:
                _a.sent();
                return [4 /*yield*/, page.evaluate(function () {
                        // select the 'my comments' tab
                        var tabs = Array.from(document.getElementsByClassName('menu_my_article'));
                        if (tabs.length === 0)
                            return new Error('Tab section could not be found');
                        var anchorTags = Array.from(document.getElementsByTagName('a')).filter(function (a) { return a.getAttribute('ng-click') === "myContentCtrl.changeView('MY_TRACE')"; });
                        if (anchorTags.length === 0)
                            return new Error('Anchor tags in tab section could not be found');
                        // reveal your comments
                        anchorTags[0].click();
                        return null;
                    })];
            case 9:
                switchToMyComments = _a.sent();
                err = switchToMyComments;
                if (err != null) {
                    console.log(err.message);
                    browser.close();
                    process.exit();
                }
                return [4 /*yield*/, sleep(1000)];
            case 10:
                _a.sent();
                return [4 /*yield*/, page.evaluate(function () {
                        return Array.from(document.getElementsByClassName('text_news')).map(function (a) { return a.href; });
                    })];
            case 11:
                getMyComments = _a.sent();
                commentLinks = getMyComments;
                if (commentLinks.length === 0) {
                    console.log('You do not have any comments');
                    browser.close();
                    process.exit();
                }
                _i = 0, commentLinks_1 = commentLinks;
                _a.label = 12;
            case 12:
                if (!(_i < commentLinks_1.length)) return [3 /*break*/, 18];
                commentLink = commentLinks_1[_i];
                console.log(commentLink);
                commentID = commentLink.split('commentNoPosition=')[1];
                console.log(commentID);
                return [4 /*yield*/, page.goto(commentLink, { waitUntil: 'networkidle2' })];
            case 13:
                _a.sent();
                return [4 /*yield*/, page.frames().find(function (f) { return f.name() === 'mainFrame'; })];
            case 14:
                frame = _a.sent();
                if (frame === undefined) {
                    console.log('Could not find appropriate frame');
                    browser.close();
                    process.exit();
                }
                return [4 /*yield*/, frame.evaluate(function (cid) {
                        var removeButtons = Array.from(document.getElementsByTagName('a')).filter(function (a) {
                            var dataAction = a.getAttribute('data-action');
                            var dataParam = a.getAttribute('data-param');
                            return dataAction === 'remove' && dataParam && dataParam.indexOf("commentNo:" + cid);
                        });
                        if (removeButtons.length === 0)
                            return new Error('Could not find a remove button');
                        removeButtons[0].click();
                        return null;
                    }, commentID)];
            case 15:
                findComment = _a.sent();
                err = findComment;
                if (err != null) {
                    console.log(err.message);
                    browser.close();
                    process.exit();
                }
                return [4 /*yield*/, sleep(1000)];
            case 16:
                _a.sent();
                _a.label = 17;
            case 17:
                _i++;
                return [3 /*break*/, 12];
            case 18: return [4 /*yield*/, browser.close()];
            case 19:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
