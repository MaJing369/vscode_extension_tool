"use strict";
/*
 * @Description: 树视图
 * @Author: 小道
 * @Date: 2021-06-01 14:14:29
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-03 11:55:40
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeViewProvider = exports.TreeItemNode = exports.TAB_MENU = void 0;
const path_1 = require("path");
const vscode_1 = require("vscode");
var TAB_MENU;
(function (TAB_MENU) {
    /**代码生成 */
    TAB_MENU["CODE_CREATE"] = "\u4EE3\u7801\u751F\u6210";
    /**代码混淆 */
    TAB_MENU["CODE_CONFUSION"] = "\u4EE3\u7801\u6DF7\u6DC6";
    /**有道翻译 */
    TAB_MENU["TRANSLATE_YOUDAO"] = "\u6709\u9053\u7FFB\u8BD1";
    /**百度 */
    TAB_MENU["BAIDU"] = "\u767E\u5EA6\u641C\u7D22";
})(TAB_MENU = exports.TAB_MENU || (exports.TAB_MENU = {}));
const ITEM_ICON_MAP = new Map([[TAB_MENU.CODE_CREATE, "robot.png"], [TAB_MENU.CODE_CONFUSION, "fox.png"],
    [TAB_MENU.TRANSLATE_YOUDAO, "youdao_translate.ico"], [TAB_MENU.BAIDU, "baidu.png"]]);
/**单项的节点(item)的类 */ 1;
class TreeItemNode extends vscode_1.TreeItem {
    constructor(label, collapsibleState) {
        super(label, collapsibleState);
        this.label = label;
        this.collapsibleState = collapsibleState;
        // command: 为每项添加点击事件的命令
        this.command = {
            title: this.label,
            command: 'itemClick',
            tooltip: this.label,
            arguments: [
                this.label, // 目前这里我们只传递一个 label
            ]
        };
        this.iconPath = TreeItemNode.getIconUriForLabel(this.label);
    }
    // __filename：当前文件的路径
    // 重点讲解 Uri.file(join(__filename,'..', '..') 算是一种固定写法
    static getIconUriForLabel(label) {
        let p = path_1.join(__filename, '..', '..', 'assets/icon', ITEM_ICON_MAP.get(label) + '');
        return vscode_1.Uri.file(p);
    }
}
exports.TreeItemNode = TreeItemNode;
class TreeViewProvider {
    /**获取树视图中的每一项 item,所以要返回 element */
    getTreeItem(element) {
        return element;
    }
    /**给每一项都创建一个 TreeItemNode */
    getChildren(element) {
        return [TAB_MENU.CODE_CREATE, TAB_MENU.BAIDU, TAB_MENU.TRANSLATE_YOUDAO, TAB_MENU.CODE_CONFUSION].map(item => new TreeItemNode(item, vscode_1.TreeItemCollapsibleState.None));
    }
    /**初始化 */
    static initTreeViewItem() {
        const treeViewProvider = new TreeViewProvider();
        vscode_1.window.registerTreeDataProvider("treeView-item", treeViewProvider);
    }
}
exports.TreeViewProvider = TreeViewProvider;
//# sourceMappingURL=TreeViewProvider.js.map