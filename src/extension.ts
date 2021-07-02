import * as vscode from 'vscode';
import { TAB_MENU, TreeViewProvider } from './TreeViewProvider';
import { WebViewManager } from './webView/WebViewManager';

// activate: 激活插件时调用此方法，你的插件在第一次执行命令时被激活
export function activate(context: vscode.ExtensionContext) {

	// context.subscriptions.push(vscode.commands.registerCommand("newtreeview.helloWorld", () => {
	// 	vscode.window.showInformationMessage('Hello World!')
	// }))

	context.subscriptions.push(vscode.commands.registerCommand("itemClick", (label: TAB_MENU) => {
		// vscode.window.showInformationMessage(label)
		let webView = WebViewManager.instance.openWebView(context, vscode.ViewColumn.Active, label);
		context.subscriptions.push(webView);
	}))
	TreeViewProvider.initTreeViewItem();

	// context.subscriptions.push(vscode.commands.registerCommand("itemClick", label => {
	// 	vscode.window.showInformationMessage(label)
	// }))
}

// 当插件停用是调用此方法，一般可以放空
export function deactivate() { }
