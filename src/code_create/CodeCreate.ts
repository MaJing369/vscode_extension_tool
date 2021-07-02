/*
 * @Description: 生成模板代码
 * @Author: 小道
 * @Date: 2021-06-02 16:17:54
 * @LastEditors: 小道
 * @LastEditTime: 2021-07-01 09:15:23
 */

import { ExtensionContext, Uri, WebviewPanel, window, workspace } from "vscode";
import * as fs from "fs"
import { join } from "path";

interface MessageData {
    modelName: string,
    modelCN: string,
    author: string,
    view: boolean,
    model: boolean,
    control: boolean,
    events: boolean
}

/**生成模板代码 */
export class CodeCreate {
    private static _instance: CodeCreate;

    readonly _view = `view":"import { BaseFuiView } from "../../core/base/BaseFuiView";

    /**登录界面*/
    export class LoginView extends BaseFuiView {
    
        protected _ui: fui.UI_loginView;
    
        constructor() {
            super(VIEW_TYPE.POPUP, "login");
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
    }`

    readonly _control = `import { EventManager } from "../../core/manager/EventManager";

    /**登录逻辑控制类 */
    export class LoginControl extends core.BaseSingle {
    
        private _event: EventManager;
    
        constructor() {
            super()
            this.initEvents();
        }
    
        protected initEvents(): void {
            this._event = EventManager.getInstance();
            this._event.on(LoginEvents.OPEN, this.openView, this);
        }
    
        /**打开界面 */
        private openView():void{
            this._event.dispatchEvent(GameEvents.OPEN_VIEW, LoginView);
        }
    }`

    readonly _model = `/**登录数据类*/
    export class LoginModel extends core.BaseSingle {
    
        constructor() {
            super();
        }
    
        /**配置初始化 */
        initCfg(): void {}
    }`

    readonly _events = `/**登录事件key*/
    export class LoginEvents {
        /**打开界面*/
        static readonly OPEN:HashCode = HashCodeUtils.hashCode;
    }`

    constructor() {
        if (CodeCreate._instance) throw "create new class CodeCreate";
    }

    /**导出模板 */
    onMessage(context: ExtensionContext, panel: WebviewPanel, msgData: MessageData): void {
        console.info("msgData", msgData);

        if (msgData.modelName === "") {
            window.showInformationMessage("模块名称未填写");
            return;
        } else if (msgData.modelCN === "") {
            window.showInformationMessage("中文注释未填写");
            return;
        } else if (msgData.author === "") {
            window.showInformationMessage("作者名称未填写");
            return;
        }
        //选择路径
        let openFSPath: string
        if (workspace.workspaceFolders) {
            openFSPath = join(workspace.workspaceFolders[0].uri.fsPath, "src", "game");
        } else {
            openFSPath = Uri.file(join(__dirname, "..", "..", "src", "game")).fsPath;
        }
        console.log("curPath", openFSPath)
        if (!fs.existsSync(openFSPath)) openFSPath = Uri.file(join(__dirname)).fsPath;
        window.showOpenDialog({ defaultUri: Uri.file(openFSPath), openLabel: "选择保存路径", canSelectFolders: true }).then(callData => {
            if (callData) this.createFile(panel, msgData, callData[0].fsPath);
        });
    }

    /**创建文件 */
    private createFile(panel: WebviewPanel, msgData: MessageData, fsPath: string): void {
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

    private saveFile(name: string, str: string, panel: WebviewPanel, savePath: string): void {
        let lastPath = savePath.substring(0, savePath.lastIndexOf("\\"));
        if (!fs.existsSync(lastPath)) {
            fs.mkdirSync(lastPath);
        }
        fs.writeFile(savePath, str, { encoding: "utf-8" }, (err) => {
            if (err) {
                panel.webview.postMessage({ command: 'err', Text: savePath + "   失败：" + err });
            } else {
                panel.webview.postMessage({ command: 'log', Text: "生成文件：" + name });
            }
        })
    }

    /**字符串替换 */
    private replaceStr(str: string, cn: string, modelUpperCase: string, modelLowerCase: string): string {
        return str.replace("Login", modelUpperCase).replace("login", modelLowerCase).replace("登录", cn);
    }

    static get instance(): CodeCreate {
        if (this._instance == null) {
            this._instance = new CodeCreate();
        }
        return this._instance;
    }
}
