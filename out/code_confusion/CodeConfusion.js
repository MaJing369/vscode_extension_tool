"use strict";
/*
 * @Description: 代码混淆
 * @Author: 小道
 * @Date: 2021-06-03 14:47:16
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-04 18:54:55
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeConfusion = void 0;
const path_1 = require("path");
const vscode_1 = require("vscode");
const javascript_obfuscator_1 = require("javascript-obfuscator");
const fs_1 = require("fs");
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
        vscode_1.window.showOpenDialog({ defaultUri: vscode_1.Uri.file(path_1.join(__filename, "..", "..", "..")), canSelectFiles: true, canSelectFolders: false })
            .then(result => {
            if (result) {
                panel.webview.postMessage({ command: 'log', Text: "选择文件：" + result[0].fsPath });
                let d = this.getFileData(result[0].fsPath, panel);
                if (d && d != "") {
                    setTimeout(() => {
                        this.obfuscateFile(d, panel);
                    }, 100);
                }
                else
                    panel.webview.postMessage({ command: 'log', Text: "没有需要加密的内容" });
            }
        });
    }
    openDir(panel) {
        vscode_1.window.showOpenDialog({ defaultUri: vscode_1.Uri.file(path_1.join(__filename, "..", "..", "..")), canSelectFiles: false, canSelectFolders: true }).then(result => {
            if (result)
                panel.webview.postMessage({
                    command: 'log', Text: "选择文件夹：" + result[0].fsPath
                });
        });
    }
    /**
     * @description: 根据路径加载文件
     * @param {*} path 路径
     * @param {*} panel WebviewPanel
     * @param {*} encoding? 解码格式
     * @return {*} string | null
     */
    getFileData(path, panel, encoding = "utf-8") {
        let rd = null;
        try {
            rd = fs_1.readFileSync(path, { encoding });
        }
        catch (e) {
            panel.webview.postMessage({ command: 'err', Text: "文件读取失败：" + e });
        }
        return rd;
    }
    /**
     * @description: 混淆文件
     * @param {string} str 需要混淆的文本
     * @param {ObfuscatorOptions} inputOptions 混淆参数
     */
    obfuscateFile(str, panel, inputOptions) {
        let resultCode = "";
        const timeStart = Date.now();
        try {
            let obfuscationResult = javascript_obfuscator_1.obfuscate(str, inputOptions);
            resultCode = obfuscationResult.getObfuscatedCode();
        }
        catch (e) {
            console.log(e);
            panel.webview.postMessage({ command: 'err', Text: "未找到需要混淆的代码，请检查是否javascript代码。" });
        }
        const obfuscationTime = (Date.now() - timeStart) / 1000;
        if (resultCode != "") {
            let oldSize = this.sizeof(str);
            let curSize = this.sizeof(resultCode);
            panel.webview.postMessage({ command: 'success', Text: "over：" + obfuscationTime + "    oldSize：" + oldSize + "    newSize：" + curSize });
        }
    }
    /**计算字符串在内存占据的大小 utf-8 格式 */
    sizeof(str) {
        let total = 0, charCode, i, len;
        for (i = 0, len = str.length; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode <= 0x007f) {
                total += 1;
            }
            else if (charCode <= 0x07ff) {
                total += 2;
            }
            else if (charCode <= 0xffff) {
                total += 3;
            }
            else {
                total += 4;
            }
        }
        if (total < 1024) {
            return total + "字节";
        }
        return Math.ceil(total / 1024) + "KB";
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