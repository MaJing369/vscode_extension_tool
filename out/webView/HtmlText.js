"use strict";
/*
 * @Description: html文本
 * @Author: 小道
 * @Date: 2021-06-02 17:33:09
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-04 18:55:14
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlText = void 0;
/**html文本 */
class HtmlText {
    /**默认百度界面 */
    static defaultHtml(src) {
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <style>
                html,
                body {
                    margin: 0 !important;
                    padding: 0 !important;
                    width: 100%;
                    height: 100%;
                }
        
                .iframeDiv {
                    width: 100%;
                    height: 100%;
                }
            </style>
        </head>
        <body>
            <iframe id='iframe1' class="iframeDiv" src=${src} scrolling="auto"></iframe>
        </body>
        </html>`;
    }
}
exports.HtmlText = HtmlText;
/**代码生成 */
HtmlText.code_create_html = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    
    <body>
        <h1>模块代码生成</h1>
        <div class="top">
            <div class="modelInput">
            <b>模块名称:</b>
                <input type="text" class="input" name="modelName"
                    onkeyup="this.value=this.value.replace(/[^a-zA-Z]/g,'')" />
                <b class="modelCN">模块说明（中文）:</b>
                <input type="text" class="input" name="modelNameCN"
                    onkeyup="this.value=this.value.replace(/[^\u4e00-\u9fa5]/g,'')" />
                <!-- <b class="authorText">作者:</b>
                <input type="text" class="input" name="author" /> -->
            </div>
        </div>
        <hr />
        <div class="modelBtn">
            <b>选择需要生成的模板：</b>
            <div class="checkbox" style="margin-top: 24px;">
                <label><input type="checkbox" name="box_view" checked> view</input></label>
                <label><input type="checkbox" name="box_control" checked> control</input></label>
                <label><input type="checkbox" name="box_model" checked> model</input></label>
                <label><input type="checkbox" name="box_events" checked> events</input></label>
            </div>
            <input type="button" , value="开始生成" onclick="startOutput()" style="font-size: 24px; margin-top: 30px;" />
        </div>
        <hr />
        <div class="logInfo">
            <ul id="logList" class="logList">
            </ul>
        </div>
    </body>
    
    <script>
        const vscode = acquireVsCodeApi();
    
        window.addEventListener("message", event => {
            let msg = event.data;
            if (msg.command && msg.Text) {
                let li = document.createElement("li");
                li.innerHTML = msg.Text;
    
                if (msg.command == "log") {
                    // li.style.color = "#000000";
                } else if (msg.command == "err") {
                    li.style.color = "#ff0000";
                }
                let logList = document.getElementById('logList');
                logList.appendChild(li);
                logList.appendChild(document.createElement("hr"));
            }
        })
        function startOutput() {
            vscode.postMessage({
                command: 'codeCreate_outPut',
                Text: {
                    modelName: document.getElementsByName('modelName')[0].value,
                    modelCN: document.getElementsByName('modelNameCN')[0].value,
                    // author: document.getElementsByName('author')[0].value,
                    view: document.getElementsByName('box_view')[0].checked,
                    control: document.getElementsByName('box_control')[0].checked,
                    model: document.getElementsByName('box_model')[0].checked,
                    events: document.getElementsByName('box_events')[0].checked
                }
            })
        }
    </script>
    
    <style>
        html,
        body {
            /* background-color: #282c34; */
            margin: 0 !important;
            padding: 0 !important;
            width: 100%;
            height: 100%;
            text-align: center;
        }
    
        b {
            font-size: 24px;
        }
    
        li {
            font-size: 20px;
            list-style: none;
        }
    
        .iframeDiv {
            width: 100%;
            height: 100%;
        }
    
        .top {
            margin-top: 30px;
        }
    
        .input {
            width: 180px;
            font-size: 24px;
        }
    
        .modelCN {
            margin-left: 30px;
        }
    
        .authorText {
            margin-left: 30px;
        }
    
        .btn {
            margin-left: 30px;
            font-size: 24px;
        }
    
        .select {
            margin-top: 30px;
        }
    
        .logList {
            /* background-color: blanchedalmond; */
            /* width: 300px; */
            height: 300px;
            overflow-y: scroll
        }
    
        .checkbox {
            font-size: 24px;
        }
    </style>
    </html>`;
/**代码混淆 */
HtmlText.code_confusion_html = `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        
        <body>
            <h1>代码混淆</h1>
            <hr />
            <input type="button" onclick="selectFile()" value="选择文件" />
            <input type="button" onclick="selectDir()" value="选择文件夹" style="margin-left: 30px;" />
            <hr />
            <div class="logInfo">
                <ul id="logList" class="logList">
                </ul>
            </div>
        </body>
        
        <script>
            const vscode = acquireVsCodeApi();
            //log日志
            window.addEventListener("message", event => {
                let msg = event.data;
                console.log(msg)
                if (msg.command && msg.Text) {
                    let li = document.createElement("li");
                    li.innerHTML = msg.Text;
        
                    if (msg.command == "log") {
                        // li.style.color = "#000000";
                    } else if (msg.command == "err") {
                        li.style.color = "#ff0000";
                    }else if (msg.command == "success") {
                        li.style.color = "#3dcb05";
                    }
                    let logList = document.getElementById('logList');
                    logList.appendChild(li);
                    logList.appendChild(document.createElement("hr"));
                }
            })
        
            function selectFile() {
                vscode.postMessage({
                    command: 'codeConfusion_select',
                    Text: { type: 0 }
                })
            }
        
            function selectDir() {
                vscode.postMessage({
                    command: 'codeConfusion_select',
                    Text: { type: 1 }
                })
            }
        </script>
        
        <style>
            body {
                text-align: center;
            }
        
            input {
                font-size: 24px;
            }
        
            .logList {
                /* background-color: blanchedalmond; */
                height: 300px;
                overflow-y: scroll
            }
        </style>
        
        </html>`;
//# sourceMappingURL=HtmlText.js.map