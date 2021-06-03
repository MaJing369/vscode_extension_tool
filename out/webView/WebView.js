"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyWebView = void 0;
const vscode_1 = require("vscode");
const CodeCreate_1 = require("../code_create/CodeCreate");
const WebViewManager_1 = require("./WebViewManager");
/*
 * @Description: 界面类
 * @Author: 小道
 * @Date: 2021-06-03 14:28:02
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-03 14:38:42
 */
class MyWebView {
    constructor(context, viewColumn, label) {
        this._label = label;
        this._panel = vscode_1.window.createWebviewPanel("webView", label, viewColumn, { retainContextWhenHidden: true, enableScripts: true });
        this._panel.webview.html = WebViewManager_1.WebViewManager.instance.getHtml(label);
        this._panel.webview.onDidReceiveMessage(this.onMessage.bind(this), undefined, context.subscriptions);
        this._panel.onDidDispose(this.onDispose, this);
    }
    onMessage(msg) {
        switch (msg.command) {
            case 'outPut': //生成代码模板
                let msgData = msg.Text;
                CodeCreate_1.CodeCreate.instance.outPut(this._panel, msgData);
                return;
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
//# sourceMappingURL=WebView.js.map