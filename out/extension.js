"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const TreeViewProvider_1 = require("./TreeViewProvider");
const WebViewManager_1 = require("./webView/WebViewManager");
// activate: 激活插件时调用此方法，你的插件在第一次执行命令时被激活
function activate(context) {
    // context.subscriptions.push(vscode.commands.registerCommand("newtreeview.helloWorld", () => {
    // 	vscode.window.showInformationMessage('Hello World!')
    // }))
    context.subscriptions.push(vscode.commands.registerCommand("itemClick", (label) => {
        // vscode.window.showInformationMessage(label)
        let webView = WebViewManager_1.WebViewManager.instance.openWebView(context, vscode.ViewColumn.Active, label);
        context.subscriptions.push(webView);
    }));
    TreeViewProvider_1.TreeViewProvider.initTreeViewItem();
    // context.subscriptions.push(vscode.commands.registerCommand("itemClick", label => {
    // 	vscode.window.showInformationMessage(label)
    // }))
}
exports.activate = activate;
// 当插件停用是调用此方法，一般可以放空
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map