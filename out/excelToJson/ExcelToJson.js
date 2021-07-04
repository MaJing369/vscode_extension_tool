"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelToJson = void 0;
const fs_1 = require("fs");
const node_xlsx_1 = require("node-xlsx");
const path_1 = require("path");
const vscode_1 = require("vscode");
/*
 * @Description: excel转json
 * @Autor: 小道
 * @Date: 2021-07-02 21:06:24
 * @LastEditors: 小道
 * @LastEditTime: 2021-07-04 23:23:22
 */
class ExcelToJson {
    constructor() {
        this._fileMap = new Map();
        this._filterArr = [];
        this._isOutPut = false;
    }
    /**
     * @description: 收到消息
     * @param {WebviewPanel} panel
     * @param {object} msgData type 0.文件 1.文件夹 2.保存文件
     */
    onMessage(panel, msgData) {
        if (this._isOutPut)
            return;
        if (msgData.type === 0) {
            this.openFile(panel);
        }
        else if (msgData.type === 1) {
            this.openDir(panel);
        }
        else if (msgData.type === 2) {
            this._isOutPut = true;
            this.outPutFile(panel, msgData.list, msgData.merge);
        }
    }
    openFile(panel) {
        vscode_1.window.showOpenDialog({ defaultUri: vscode_1.Uri.file(path_1.join(__dirname, "..", "..", "..")), canSelectFiles: true, canSelectFolders: false })
            .then(result => {
            this.clearDate(panel);
            if (result) {
                const readPath = result[0].fsPath;
                if (!this.fileTest(readPath)) {
                    vscode_1.window.showInformationMessage("请选择excel文件");
                    return;
                }
                let fileName = path_1.basename(readPath);
                this._fileMap.set(fileName, readPath);
                this.addFileLi(panel, fileName);
            }
        });
    }
    openDir(panel) {
        vscode_1.window.showOpenDialog({ defaultUri: vscode_1.Uri.file(path_1.join(__dirname, "..", "..", "..")), canSelectFiles: false, canSelectFolders: true }).then(result => {
            this.clearDate(panel);
            if (result) {
                let fileList = fs_1.readdirSync(result[0].fsPath);
                let idx = fileList.indexOf(".filter");
                if (idx >= 0) {
                    this.setFilterFile(panel, result[0].fsPath + "\\.filter");
                }
                fileList.forEach(fileName => {
                    console.log(fileName);
                    if (fileName.indexOf("~$") >= 0 || !this.fileTest(fileName))
                        return;
                    let readPath = result[0].fsPath + "\\" + fileName;
                    let fileStat = fs_1.statSync(readPath);
                    if (fileStat.isFile()) {
                        if (fileName.indexOf(".filter") >= 0) {
                        }
                        else {
                            this._fileMap.set(fileName, readPath);
                            this.addFileLi(panel, fileName);
                        }
                    }
                });
            }
        });
    }
    /**
     * @description: 过滤文件处理
     */
    setFilterFile(panel, filePath) {
        let fileDate = this.getFileData(filePath, panel);
        if (fileDate) {
            this._filterArr = fileDate.split(",");
            console.log("this._filterArr", this._filterArr);
            this._filterArr.forEach(label => {
                this.addFilterLi(panel, label);
            });
        }
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
            console.error("文件读取失败：" + e);
            vscode_1.window.showInformationMessage("文件读取失败：" + path);
        }
        return rd;
    }
    fileTest(filePath) {
        if (filePath.indexOf(".xlsx") < 0 && filePath.indexOf(".xls") < 0 && filePath.indexOf(".filter") < 0)
            return false;
        return true;
    }
    addFileLi(panel, fileName) {
        panel.webview.postMessage({
            command: 'itemList',
            text: fileName,
            select: !this._filterArr.includes(fileName)
        });
    }
    addFilterLi(panel, fileName) {
        panel.webview.postMessage({
            command: 'filterList',
            text: fileName
        });
    }
    clearDate(panel) {
        this._fileMap.clear();
        this._filterArr = [];
        panel.webview.postMessage({
            command: 'clearList'
        });
    }
    /**
     * @description: 开始导出文件处理
     * @param {*} panel
     * @param {*} list
     * @param {*} merge
     */
    outPutFile(panel, selectList, merge) {
        vscode_1.window.showOpenDialog({ defaultUri: vscode_1.Uri.file(path_1.join(__dirname, "..", "..", "..")), canSelectFiles: false, canSelectFolders: true }).then(result => {
            if (result) {
                let xlsxDates = this.analysisXlsx(selectList);
                if (merge) { //合并为一个json
                    let jsonData = {};
                    xlsxDates.forEach((value, key) => {
                        jsonData[key] = value;
                    });
                    fs_1.writeFile(result[0].fsPath + "\\config.json", JSON.stringify(jsonData), () => {
                        vscode_1.window.showInformationMessage("json导出完成");
                        this._isOutPut = false;
                    });
                }
                else {
                    let arr = [];
                    xlsxDates.forEach((value, key) => {
                        arr.push([key, value]);
                    });
                    this.saveFiles(arr, 0, result[0].fsPath);
                }
            }
        });
    }
    /**
     * @description: 保存多个文件
     * @param {string} files
     * @param {number} idx
     * @param {string} savePath
     */
    saveFiles(files, idx, savePath) {
        let d = files[idx];
        fs_1.writeFile(savePath + "\\" + d[0] + ".json", JSON.stringify(d[1]), () => {
            if (idx >= files.length - 1) {
                vscode_1.window.showInformationMessage("json导出完成");
                this._isOutPut = false;
            }
            else
                this.saveFiles(files, idx + 1, savePath);
        });
    }
    /**
     * @description: xlsx解析
     * @param {string} selectList
     * @return {*}
     */
    analysisXlsx(selectList) {
        let xlsxDates = new Map();
        this._fileMap.forEach((itemFile, fileName) => {
            if (!selectList || selectList.includes(fileName)) {
                let xlsxDate = node_xlsx_1.parse(itemFile);
                if (xlsxDate && xlsxDate.length > 0) {
                    xlsxDate.forEach((value, index) => {
                        if (value.data.length > 0) {
                            let jsonDataArr = [];
                            let yData = value.data;
                            for (let y = 1; y < yData.length; y++) {
                                let jsonData = {};
                                let xData = yData[y];
                                for (let x = 0; x < xData.length; x++) {
                                    jsonData[yData[0][x]] = xData[x];
                                }
                                if (jsonData.hasOwnProperty(yData[0][0]))
                                    jsonDataArr.push(jsonData);
                            }
                            if (jsonDataArr.length > 0) {
                                let saveFileName = value.name;
                                if (value.name.indexOf("Sheet") >= 0) {
                                    console.log(xlsxDate.length);
                                    if (xlsxDate.length === 1) {
                                        saveFileName = fileName;
                                    }
                                    else {
                                        vscode_1.window.showInformationMessage(fileName + " : " + value.name + " 命名错误请检查");
                                        return;
                                    }
                                }
                                saveFileName = saveFileName.replace(".xlsx", "").replace(".xls", "");
                                xlsxDates.set(saveFileName, jsonDataArr);
                            }
                        }
                    });
                }
            }
        });
        return xlsxDates;
    }
    static get instance() {
        if (this._instance == null) {
            this._instance = new ExcelToJson();
        }
        return this._instance;
    }
}
exports.ExcelToJson = ExcelToJson;
//# sourceMappingURL=ExcelToJson.js.map