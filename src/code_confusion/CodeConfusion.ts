/*
 * @Description: 代码混淆
 * @Author: 小道
 * @Date: 2021-06-03 14:47:16
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-03 15:14:34
 */

import { type } from "os";
import { join } from "path";
import { Uri, WebviewPanel, window } from "vscode";

export class CodeConfusion {
    private static _instance: CodeConfusion;

    /**
     * @description: 收到消息
     * @param {WebviewPanel} panel
     * @param {object} msgData type 0.文件 1.文件夹
     */
    onMessage(panel: WebviewPanel, msgData: { type: number }): void {
        msgData.type === 0 ? this.openFile(panel) : this.openDir(panel)
    }

    private openFile(panel: WebviewPanel): void {

        window.showOpenDialog({ defaultUri: Uri.file(join(__filename, "..", "..", "..")), canSelectFiles: true, canSelectFolders: false }).then(result => {
            if (result) panel.webview.postMessage({
                command: 'log', Text: "选择文件：" + result[0].path
            });

        })
    }

    private openDir(panel: WebviewPanel): void {
        window.showOpenDialog({ defaultUri: Uri.file(join(__filename, "..", "..", "..")), canSelectFiles: false, canSelectFolders: true }).then(result => {
            if (result) panel.webview.postMessage({
                command: 'log', Text: "选择文件夹：" + result[0].path
            });
        });

    }

    static get instance(): CodeConfusion {
        if (this._instance == null) {
            this._instance = new CodeConfusion();
        }
        return this._instance;
    }
}
