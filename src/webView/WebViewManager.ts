/*
 * @Description: 文件说明
 * @Author: 小道
 * @Date: 2021-06-01 15:07:32
 * @LastEditors: 小道
 * @LastEditTime: 2021-07-02 23:19:42
 */

import { ExtensionContext, Uri, ViewColumn, WebviewPanel, window } from "vscode";
import { TAB_MENU } from "../TreeViewProvider";
import { HtmlText } from "./HtmlText";
import { MyWebView } from "./MyWebView"

export class WebViewManager {

    private static _instance: WebViewManager;
    private _webViewMap: Map<string, MyWebView> = new Map();

    constructor() {
        if (WebViewManager._instance) throw "create new class WebView";
    }

    /**
     * @description: 打开一个web界面
     * @param {ExtensionContext} context
     * @param {ViewColumn} viewColumn
     * @param {TAB_MENU} label
     * @return {WebviewPanel}
     */
    openWebView(context: ExtensionContext, viewColumn: ViewColumn, label: TAB_MENU): WebviewPanel {
        let webViewPanel = this._webViewMap.get(label) || null;
        if (!webViewPanel) {
            webViewPanel = new MyWebView(context, viewColumn, label);
            this._webViewMap.set(label, webViewPanel)
        } else {
            webViewPanel.reveal()// Webview面板一次只能显示在一列中。如果它已经显示，则此方法将其移动到新列。
        }
        return webViewPanel.panel!;
    }

    getHtml(label: TAB_MENU): string {
        let html: string = ""
        switch (label) {
            case TAB_MENU.CODE_CREATE:
                html = HtmlText.code_create_html;
                break;
            case TAB_MENU.CODE_CONFUSION:
                html = HtmlText.code_confusion_html;
                break;
            case TAB_MENU.TRANSLATE_YOUDAO:
                html = HtmlText.defaultHtml("http://nmt.youdao.com/");
                break;
            case TAB_MENU.EXCELTOJSON:
                html = HtmlText.excelToJson_html
                break;
            default:
                html = HtmlText.defaultHtml("https://www.baidu.com/");
                break
        }
        return html;
    }

    del(label: string): void {
        this._webViewMap.delete(label);
    }

    static get instance(): WebViewManager {
        if (this._instance == null) {
            this._instance = new WebViewManager()
        }
        return this._instance;
    }
}