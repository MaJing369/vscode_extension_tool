"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyWebView = void 0;
const vscode_1 = require("vscode");
const CodeConfusion_1 = require("../code_confusion/CodeConfusion");
const CodeCreate_1 = require("../code_create/CodeCreate");
const WebViewManager_1 = require("./WebViewManager");
/*
 * @Description: 界面类
 * @Author: 小道
 * @Date: 2021-06-03 14:28:02
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-03 14:56:21
 */
class MyWebView {
    constructor(context, viewColumn, label) {
        this._label = label;
        this._panel = vscode_1.window.createWebviewPanel("webView", label, viewColumn, { retainContextWhenHidden: true, enableScripts: true });
        this._panel.webview.html = WebViewManager_1.WebViewManager.instance.getHtml(label);
        this._panel.webview.onDidReceiveMessage(this.onMessage.bind(this), undefined, context.subscriptions);
        this._panel.onDidDispose(this.onDispose, this);
    }
    get panel() {
        return this._panel;
    }
    reveal() {
        this._panel.reveal();
    }
    onMessage(msg) {
        let msgData = msg.Text;
        switch (msg.command) {
            case 'codeCreate_outPut': //生成代码模板
                CodeCreate_1.CodeCreate.instance.onMessage(this._panel, msgData);
                break;
            case "codeConfusion_select": //代码混淆
                CodeConfusion_1.CodeConfusion.instance.onMessage(this._panel, msgData);
                break;
        }
    }
    onDispose() {
        WebViewManager_1.WebViewManager.instance.del(this._label);
        this._panel.dispose();
        this._panel = null;
        this._label = null;
    }
}
exports.MyWebView = MyWebView;
//# sourceMappingURL=MyWebView.js.map