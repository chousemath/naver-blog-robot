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
var urlLoginPage = 'https://nid.naver.com/nidlogin.login';
var urlBlogDashboard = 'https://section.blog.naver.com/BlogHome.nhn?directoryNo=0&currentPage=1&groupId=0';
var sleep = function (ms) {
    if (ms === void 0) { ms = 0; }
    return new Promise(function (r) { return setTimeout(r, ms); });
};
(function () { return __awaiter(_this, void 0, void 0, function () {
    var browser, page, viewport, switchToMyComments, getMyComments;
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
                return [4 /*yield*/, page.goto(urlLoginPage, { waitUntil: 'networkidle2' })
                    // const login = await page.evaluate((cred: Credentials): boolean | null => {
                    //     const id: HTMLElement | null = document.getElementById('id');
                    //     if (id === null) return null;
                    //     (id as HTMLInputElement).value = cred.id;
                    //     const pw: HTMLElement | null = document.getElementById('pw');
                    //     if (pw === null) return null;
                    //     (pw as HTMLInputElement).value = cred.pw;
                    //     const loginForms: Array<Element> = Array.from(document.getElementsByClassName('login_form'));
                    //     if (loginForms.length === 0) return null;
                    //     const globalButtons: Array<Element> = Array.from(loginForms[0].getElementsByClassName('btn_global'));
                    //     if (globalButtons.length === 0) return null;
                    //     (globalButtons[0] as HTMLInputElement).click();
                    //     return true;
                    // }, credentials);
                    // const result = login;
                ];
            case 3:
                _a.sent();
                // const login = await page.evaluate((cred: Credentials): boolean | null => {
                //     const id: HTMLElement | null = document.getElementById('id');
                //     if (id === null) return null;
                //     (id as HTMLInputElement).value = cred.id;
                //     const pw: HTMLElement | null = document.getElementById('pw');
                //     if (pw === null) return null;
                //     (pw as HTMLInputElement).value = cred.pw;
                //     const loginForms: Array<Element> = Array.from(document.getElementsByClassName('login_form'));
                //     if (loginForms.length === 0) return null;
                //     const globalButtons: Array<Element> = Array.from(loginForms[0].getElementsByClassName('btn_global'));
                //     if (globalButtons.length === 0) return null;
                //     (globalButtons[0] as HTMLInputElement).click();
                //     return true;
                // }, credentials);
                // const result = login;
                return [4 /*yield*/, sleep(18000)];
            case 4:
                // const login = await page.evaluate((cred: Credentials): boolean | null => {
                //     const id: HTMLElement | null = document.getElementById('id');
                //     if (id === null) return null;
                //     (id as HTMLInputElement).value = cred.id;
                //     const pw: HTMLElement | null = document.getElementById('pw');
                //     if (pw === null) return null;
                //     (pw as HTMLInputElement).value = cred.pw;
                //     const loginForms: Array<Element> = Array.from(document.getElementsByClassName('login_form'));
                //     if (loginForms.length === 0) return null;
                //     const globalButtons: Array<Element> = Array.from(loginForms[0].getElementsByClassName('btn_global'));
                //     if (globalButtons.length === 0) return null;
                //     (globalButtons[0] as HTMLInputElement).click();
                //     return true;
                // }, credentials);
                // const result = login;
                _a.sent();
                return [4 /*yield*/, page.screenshot({ path: 'example1.png' })];
            case 5:
                _a.sent();
                return [4 /*yield*/, page.goto(urlBlogDashboard, { waitUntil: 'networkidle2' })];
            case 6:
                _a.sent();
                return [4 /*yield*/, page.screenshot({ path: 'example2.png' })];
            case 7:
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
            case 8:
                switchToMyComments = _a.sent();
                switchToMyComments;
                return [4 /*yield*/, sleep(1000)];
            case 9:
                _a.sent();
                return [4 /*yield*/, page.evaluate(function () {
                        return Array.from(document.getElementsByClassName('text_news')).map(function (a) { return a.href; });
                    })];
            case 10:
                getMyComments = _a.sent();
                console.log(getMyComments);
                return [4 /*yield*/, page.screenshot({ path: 'example3.png' })];
            case 11:
                _a.sent();
                return [4 /*yield*/, browser.close()];
            case 12:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
