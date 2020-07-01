import React, { Component } from 'react';
import CodeStatus from "../../../components/codeStatus.jsx"
import Doc from "../../../components/doc.jsx";
import { WangEditor } from "cake-ui/src";


//组件属性
const propsConfig = [
    {
      key: "serverUrl",
      param: "serverUrl",
      explain: "上传图片的地址",
      type: "string",
      defaultValue: ""
    }
];

const UPLOAD_FILE_DATA = `/file/upload`; //上传文件到data (POST 参数：file:上传文件流 login_yes:"")
const DOWNLOAD_FILE_DATA = `/file/view`; //从data下载文件 (GET 参数：/上传时返回的content)
export default class EditorTest extends Component {
    constructor(props, context) {
        super(props, context);
        this.dataUrl="http://resource.lcbeta.com"
    }

    render() {
        const url=""

        return (
            <div>
                <h2>WangEditor 示例：</h2>
                <WangEditor 
                    uploadImgServer={this.dataUrl + UPLOAD_FILE_DATA}
                    uploadImgParams={{login_yes:"01450afeea6c4048846ff8121aa8b764"}}
                    uploadImgHooks={{
                        success: (xhr, editor, result)=>{
                            const res=JSON.parse(result)
                            const url = this.dataUrl + DOWNLOAD_FILE_DATA + "/" + res.content;
                            editor.cmd.do('insertHTML', `<img src="${  url  }"/>`);
                        }
                    }}
                />

                <CodeStatus>{`
import { WangEditor } from "cake-ui"

const UPLOAD_FILE_DATA = '/file/upload'; //上传文件到data (POST 参数：file:上传文件流 login_yes:"")
const DOWNLOAD_FILE_DATA = '/file/view'; //从data下载文件 (GET 参数：/上传时返回的content)

<WangEditor 
    uploadImgServer={this.dataUrl + UPLOAD_FILE_DATA}
    uploadImgParams={{login_yes:"01450afeea6c4048846ff8121aa8b764"}}
    uploadImgHooks={{
        success: (xhr, editor, result)=>{
            const res=JSON.parse(result)
            const url = this.dataUrl + DOWNLOAD_FILE_DATA + "/" + res.content;
            editor.cmd.do('insertHTML', "<img src={ url }/>");
        }
    }}
/>
            `}</CodeStatus>
        
                {/* 参数说明 */}
                <h2>组件属性</h2>
                <Doc dataList={propsConfig} />
            </div>
        );
    }

}