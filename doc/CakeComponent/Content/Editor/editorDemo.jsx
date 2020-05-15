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

export default class EditorTest extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const url=""

        return (
            <div>
                <h2>WangEditor 示例：</h2>
                <WangEditor serverUrl={url} />

                <CodeStatus>{`
import { WangEditor } from "cake-ui"

<WangEditor serverUrl={this.dataUrl} />
            `}</CodeStatus>
        
                {/* 参数说明 */}
                <h2>组件属性</h2>
                <Doc dataList={propsConfig} />
            </div>
        );
    }

}