"use strict";
/*
 * @Description: 生成模板代码
 * @Author: 小道
 * @Date: 2021-06-02 16:17:54
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-03 15:16:50
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeCreate = void 0;
const vscode_1 = require("vscode");
const fs = require("fs");
const path_1 = require("path");
/**生成模板代码 */
class CodeCreate {
    constructor() {
        this._view = `view":"import { BaseFuiView } from "../../core/base/BaseFuiView";

    /**登录界面*/
    export class LoginView extends BaseFuiView {
    
        protected _ui: fui.UI_loginView;
    
        constructor() {
            super(ViewType.POPUP, "login");
        }
    
        protected init(): void {
            this._ui = fui.UI_loginView.createInstance();
            this.addChild(this._ui.displayObject);
            super.init();
        }
    
        show(showData?): void {
            super.show();
        }
    
        protected destroy(): void {
            super.destroy();
        }
    }`;
        this._control = `import { EventManager } from "../../core/manager/EventManager";

    /**登录逻辑控制类 */
    export class LoginControl extends core.BaseSingle {
    
        private _event: EventManager;
    
        constructor() {
            super()
            this.initEvents();
        }
    
        private initEvents(): void {
            this._event = EventManager.getInstance();
        }
    }`;
        this._model = `/**登录数据类*/
    export class LoginModel extends core.BaseSingle {
    
        constructor() {
            super();
        }
    
        /**配置初始化 */
        initCfg(): void {}
    }`;
        this._events = `/**登录事件key*/
    export class LoginEvents {}`;
        if (CodeCreate._instance)
            throw "create new class CodeCreate";
    }
    /**导出模板 */
    onMessage(panel, msgData) {
        console.info("msgData", msgData);
        if (msgData.modelName == "") {
            vscode_1.window.showInformationMessage("模块名称未填写");
            return;
        }
        else if (msgData.modelCN == "") {
            vscode_1.window.showInformationMessage("中文注释未填写");
            return;
        }
        else if (msgData.author == "") {
            vscode_1.window.showInformationMessage("作者名称未填写");
            return;
        }
        //选择路径
        vscode_1.window.showOpenDialog({ defaultUri: vscode_1.Uri.file(path_1.join(__filename, "..", "..")), canSelectFolders: true }).then(callData => {
            if (callData)
                this.createFile(panel, msgData, callData[0].fsPath);
        });
    }
    /**创建文件 */
    createFile(panel, msgData, fsPath) {
        panel.webview.postMessage({ command: 'log', Text: "保存路径：" + fsPath });
        let modelUpperCase = msgData.modelName.charAt(0).toUpperCase() + msgData.modelName.slice(1);
        let modelLowerCase = msgData.modelName.charAt(0).toLowerCase() + msgData.modelName.slice(1);
        let savePath = fsPath + "\\" + modelLowerCase;
        if (msgData.view) {
            let view = this.replaceStr(this._view, msgData.modelCN, modelUpperCase, modelLowerCase);
            this.saveFile(modelUpperCase + "View.ts", view, panel, savePath + "\\" + modelUpperCase + "View.ts");
        }
        if (msgData.control) {
            let control = this.replaceStr(this._control, msgData.modelCN, modelUpperCase, modelLowerCase);
            this.saveFile(modelUpperCase + "Control.ts", control, panel, savePath + "\\" + modelUpperCase + "Control.ts");
        }
        if (msgData.model) {
            let model = this.replaceStr(this._model, msgData.modelCN, modelUpperCase, modelLowerCase);
            this.saveFile(modelUpperCase + "Model.ts", model, panel, savePath + "\\" + modelUpperCase + "Model.ts");
        }
        if (msgData.events) {
            let events = this.replaceStr(this._events, msgData.modelCN, modelUpperCase, modelLowerCase);
            this.saveFile(modelUpperCase + "Events.ts", events, panel, savePath + "\\" + modelUpperCase + "Events.ts");
        }
    }
    saveFile(name, str, panel, savePath) {
        let lastPath = savePath.substring(0, savePath.lastIndexOf("\\"));
        if (!fs.statSync(lastPath).isDirectory()) {
            fs.mkdirSync(lastPath);
        }
        fs.writeFile(savePath, str, { encoding: "utf-8" }, (err) => {
            if (err) {
                panel.webview.postMessage({ command: 'err', Text: savePath + "   失败：" + err });
            }
            else {
                panel.webview.postMessage({ command: 'log', Text: "生成文件：" + name });
            }
        });
    }
    /**字符串替换 */
    replaceStr(str, cn, modelUpperCase, modelLowerCase) {
        return str.replace("Login", modelUpperCase).replace("login", modelLowerCase).replace("登录", cn);
    }
    static get instance() {
        if (this._instance == null) {
            this._instance = new CodeCreate();
        }
        return this._instance;
    }
}
exports.CodeCreate = CodeCreate;
//# sourceMappingURL=CodeCreate.js.map