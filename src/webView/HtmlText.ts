/*
 * @Description: html文本
 * @Author: 小道
 * @Date: 2021-06-02 17:33:09
 * @LastEditors: 小道
 * @LastEditTime: 2021-07-04 21:28:13
 */

/**html文本 */
export class HtmlText {
    /**代码生成 */
    static readonly code_create_html = `<!DOCTYPE html>
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
    static readonly code_confusion_html = `<!DOCTYPE html>
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
        
        </html>`

    /**excel转json */
    static readonly excelToJson_html = `<!--
    * @Description: excel转json
    * @Autor: 小道
    * @Date: 2021-07-02 21:31:04
    * @LastEditors: 小道
    * @LastEditTime: 2021-07-03 11:22:15
   -->
   <!DOCTYPE html>
   <html lang="en">
   
   <head>
       <meta charset="utf-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1" />
   </head>
   
   <body>
       <h1>Excel转Json</h1>
       <h5>*Sheet为关键字请不到使用Sheet来命名</h5>
       <h5>*如只有一个Sheet则使用表明命名数据key，如多个Sheet请命名每个页签的名称,否则数据将不会导出</h5>
       <hr />
       <input type="button" onclick="selectFile()" value="选择文件" />
       <input type="button" onclick="selectDir()" value="选择文件夹" style="margin-left: 30px;" />
       <hr />
       <label><input type="checkbox" name="isMerge" checked>合并文件</input></label>
       <input type="button" onclick="saveFile()" value="导出" style="margin-left: 30px;" />
       <hr />
       <div style="display: inline-flex; width:100%">
           <h5 style="width: 50%;">导出文件</h5>
           <h5 style="width: 50%;">过滤文件</h5>
       </div>
   
       <hr />
       <div style="display: inline-flex; width:100%">
           <ul id="itemList" style="height: 500px; width: 50%; overflow-y: scroll"></ul>
           <ul id="filterList" style="height: 500px; width: 50%; overflow-y: scroll"></ul>
       </div>
   </body>
   
   <script>
       const vscode = acquireVsCodeApi();
   
       window.addEventListener("message", event => {
           let msg = event.data;
           if (!msg.command) return;
           console.log("msgData", msg)
           if (msg.command === "itemList") {
               let itemList = document.getElementById('itemList');
               let li = document.createElement("li");
               li.innerText = msg.text;
   
               let input = document.createElement("input");
               input.type = "checkbox";
               input.checked = msg.select;
               li.appendChild(input)
               itemList.appendChild(li);
           } else if (msg.command === "filterList") {
               let filterList = document.getElementById('filterList');
               let li = document.createElement("li");
               li.innerText = msg.text;
               filterList.appendChild(li);
           } else if (msg.command === "clearList") {
               let itemList = document.getElementById('itemList');
               let itemLiList = itemList.getElementsByTagName("li")
               if (itemLiList && itemLiList.length > 0) {
                   while (itemLiList.length > 0) {
                       itemLiList[0].remove();
                   }
               }
   
               let filterList = document.getElementById('filterList');
               let filterLiList = filterList.getElementsByTagName("li")
               if (filterLiList && filterLiList.length > 0) {
                   while (filterLiList.length > 0) {
                       filterLiList[0].remove();
                   }
               }
           }
       })
   
       function selectFile() {
           vscode.postMessage({
               command: 'excelToJson',
               Text: { type: 0 }
           })
       }
   
       function selectDir() {
           vscode.postMessage({
               command: 'excelToJson',
               Text: { type: 1 }
           })
       }
   
       function saveFile() {
           let selectList = [];
           let itemList = document.getElementById('itemList').getElementsByTagName("li");
           for (let i = 0; i < itemList.length; i++) {
               let input = itemList[i].getElementsByTagName("input");
               if (input && input[0].checked) selectList.push(itemList[i].innerText)
           }
   
           vscode.postMessage({
               command: 'excelToJson',
               Text: { type: 2, list: selectList, merge: document.getElementsByName('isMerge')[0].checked }
           })
       }
   </script>
   
   <style>
       body {
           text-align: center;
       }
   
       p {
           line-height: 40px;
       }
   
       input {
           font-size: 24px;
       }
   </style>
   
   </html>`;

    /**默认百度界面 */
    static defaultHtml(src: string): string {
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

