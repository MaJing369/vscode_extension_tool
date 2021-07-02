import { ExtensionContext, ViewColumn, WebviewPanel, window } from "vscode";
import { CodeConfusion } from "../code_confusion/CodeConfusion";
import { CodeCreate } from "../code_create/CodeCreate";
import { TAB_MENU } from "../TreeViewProvider";
import { WebViewManager } from "./WebViewManager";

/*
 * @Description: 界面类
 * @Author: 小道
 * @Date: 2021-06-03 14:28:02
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-30 01:20:35
 */
export class MyWebView {

    private _panel: WebviewPanel | null;
    private _label: string | null;
    private _context: ExtensionContext

    get panel(): WebviewPanel | null {
        return this._panel
    }

    constructor(context: ExtensionContext, viewColumn: ViewColumn, label: TAB_MENU) {
        this._label = label;
        this._context = context;
        this._panel = window.createWebviewPanel("webView", label, viewColumn, { retainContextWhenHidden: true, enableScripts: true });
        this._panel.webview.html = WebViewManager.instance.getHtml(label);
        this._panel.webview.onDidReceiveMessage(this.onMessage.bind(this), undefined, context.subscriptions);
        this._panel.onDidDispose(this.onDispose, this);
    }

    reveal(): void {
        this._panel!.reveal();
    }

    private onMessage(msg: any): void {
        let msgData = msg.Text;
        switch (msg.command) {
            case 'codeCreate_outPut': //生成代码模板
                CodeCreate.instance.onMessage(this._context, this._panel!, msgData)
                break;
            case "codeConfusion_select": //代码混淆
                CodeConfusion.instance.onMessage(this._panel!, msgData)
                break;
        }
    }

    private onDispose(): void {
        WebViewManager.instance.del(this._label!);
        this._panel!.dispose();
        this._panel = null;
        this._label = null;
    }
}
