/*
 * @Description: 树视图
 * @Author: 小道
 * @Date: 2021-06-01 14:14:29
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-03 11:55:40
 */

import { join } from "path";
import { Event, ProviderResult, TreeDataProvider, TreeItem, TreeItemCollapsibleState, Uri, window } from "vscode";

export enum TAB_MENU {
    /**代码生成 */
    CODE_CREATE = "代码生成",
    /**代码混淆 */
    CODE_CONFUSION = "代码混淆",
    /**有道翻译 */
    TRANSLATE_YOUDAO = "有道翻译",
    /**百度 */
    BAIDU = "百度搜索"
}

const ITEM_ICON_MAP = new Map<string, string>([[TAB_MENU.CODE_CREATE, "robot.png"], [TAB_MENU.CODE_CONFUSION, "fox.png"],
[TAB_MENU.TRANSLATE_YOUDAO, "youdao_translate.ico"], [TAB_MENU.BAIDU, "baidu.png"]]);

/**单项的节点(item)的类 */1
export class TreeItemNode extends TreeItem {

    constructor(readonly label: string, readonly collapsibleState: TreeItemCollapsibleState) {
        super(label, collapsibleState);
    }

    // command: 为每项添加点击事件的命令
    command = {
        title: this.label,          // 标题
        command: 'itemClick',       // 命令 ID
        tooltip: this.label,        // 鼠标覆盖时的小小提示框
        arguments: [                // 向 registerCommand 传递的参数。
            this.label,             // 目前这里我们只传递一个 label
        ]
    }

    iconPath = TreeItemNode.getIconUriForLabel(this.label);

    // __filename：当前文件的路径
    // 重点讲解 Uri.file(join(__filename,'..', '..') 算是一种固定写法
    static getIconUriForLabel(label: string): Uri {
        let p = join(__filename, '..', '..', 'assets/icon', ITEM_ICON_MAP.get(label) + '');
        return Uri.file(p);
    }
}

export class TreeViewProvider implements TreeDataProvider<TreeItemNode>{
    onDidChangeTreeData?: Event<void | TreeItemNode | null | undefined> | undefined;

    /**获取树视图中的每一项 item,所以要返回 element */
    getTreeItem(element: TreeItemNode): TreeItem | Thenable<TreeItem> {
        return element;
    }

    /**给每一项都创建一个 TreeItemNode */
    getChildren(element?: TreeItemNode): ProviderResult<TreeItemNode[]> {
        return [TAB_MENU.CODE_CREATE, TAB_MENU.BAIDU, TAB_MENU.TRANSLATE_YOUDAO, TAB_MENU.CODE_CONFUSION].map(item => new TreeItemNode(item, TreeItemCollapsibleState.None));
    }

    /**初始化 */
    static initTreeViewItem(): void {
        const treeViewProvider = new TreeViewProvider();
        window.registerTreeDataProvider("treeView-item", treeViewProvider);
    }

}
