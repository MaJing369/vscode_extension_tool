"use strict";
/*
 * @Description: 文件说明
 * @Author: 小道
 * @Date: 2021-06-01 15:07:32
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-03 14:27:00
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebViewManager = void 0;
const vscode_1 = require("vscode");
const TreeViewProvider_1 = require("./TreeViewProvider");
const CodeCreate_1 = require("./code_create/CodeCreate");
const HtmlText_1 = require("./HtmlText");
class WebViewManager {
    constructor() {
        /**代码混淆 */
        this.code_confusion_html = ``;
        this._webViewMap = new Map();
        if (WebViewManager._instance)
            throw "create new class WebView";
    }
    /**
     * @description: 打开一个web界面
     * @param {ExtensionContext} context
     * @param {ViewColumn} viewColumn
     * @param {TAB_MENU} label
     * @return {WebviewPanel}
     */
    openWebView(context, viewColumn, label) {
        let webViewPanel = this._webViewMap.get(label) || null;
        if (!webViewPanel) {
            let myWindow = vscode_1.window;
            webViewPanel = myWindow.createWebviewPanel("webView", label, viewColumn, { retainContextWhenHidden: true, enableScripts: true });
            webViewPanel.webview.html = this.getHtml(label);
            this._webViewMap.set(label, webViewPanel);
            webViewPanel.webview.onDidReceiveMessage(msg => {
                switch (msg.command) {
                    case 'outPut': //生成代码模板
                        let msgData = msg.Text;
                        CodeCreate_1.CodeCreate.instance.outPut(webViewPanel, msgData);
                        return;
                }
            }, undefined, context.subscriptions);
        }
        else {
            console.log("webViewPanel", webViewPanel);
            webViewPanel.reveal(); // Webview面板一次只能显示在一列中。如果它已经显示，则此方法将其移动到新列。
        }
        webViewPanel.onDidDispose(() => {
            console.log("销毁。。。", webViewPanel.title);
            console.log(this._webViewMap);
            // webViewPanel = null;
        }, this);
        return webViewPanel;
    }
    getHtml(label) {
        let html = "";
        switch (label) {
            case TreeViewProvider_1.TAB_MENU.CODE_CREATE:
                html = HtmlText_1.HtmlText.code_create_html;
                break;
            case TreeViewProvider_1.TAB_MENU.CODE_CONFUSION:
                html = HtmlText_1.HtmlText.code_confusion_html;
                break;
            case TreeViewProvider_1.TAB_MENU.TRANSLATE_YOUDAO:
                html = HtmlText_1.HtmlText.defaultHtml("http://nmt.youdao.com/");
                break;
            default:
                html = HtmlText_1.HtmlText.defaultHtml("https://www.baidu.com/");
                break;
        }
        return html;
    }
    static get instance() {
        if (this._instance == null) {
            this._instance = new WebViewManager();
        }
        return this._instance;
    }
}
exports.WebViewManager = WebViewManager;
//# sourceMappingURL=WebViewManager.js.map