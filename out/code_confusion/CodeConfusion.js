"use strict";
/*
 * @Description: 代码混淆
 * @Author: 小道
 * @Date: 2021-06-03 14:47:16
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-03 15:14:34
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeConfusion = void 0;
const path_1 = require("path");
const vscode_1 = require("vscode");
class CodeConfusion {
    /**
     * @description: 收到消息
     * @param {WebviewPanel} panel
     * @param {object} msgData type 0.文件 1.文件夹
     */
    onMessage(panel, msgData) {
        msgData.type === 0 ? this.openFile(panel) : this.openDir(panel);
    }
    openFile(panel) {
        vscode_1.window.showOpenDialog({ defaultUri: vscode_1.Uri.file(path_1.join(__filename, "..", "..", "..")), canSelectFiles: true, canSelectFolders: false }).then(result => {
            if (result)
                panel.webview.postMessage({
                    command: 'log', Text: "选择文件：" + result[0].path
                });
        });
    }
    openDir(panel) {
        vscode_1.window.showOpenDialog({ defaultUri: vscode_1.Uri.file(path_1.join(__filename, "..", "..", "..")), canSelectFiles: false, canSelectFolders: true }).then(result => {
            if (result)
                panel.webview.postMessage({
                    command: 'log', Text: "选择文件夹：" + result[0].path
                });
        });
    }
    static get instance() {
        if (this._instance == null) {
            this._instance = new CodeConfusion();
        }
        return this._instance;
    }
}
exports.CodeConfusion = CodeConfusion;
//# sourceMappingURL=CodeConfusion.js.map