import React, { Component } from 'react';
import CodeStatus from "../../../components/codeStatus.jsx"
import Doc from "../../../components/doc.jsx";
import { PhotoView} from "cake-ui/src";

//组件属性
const propsConfig = [
    {
        key: "0",
        param: "className",
        explain: "自定义类",
        type: "String",
        defaultValue: ""
    },
]
class PhotoViewDemo extends Component{
    render() {
        return (
            <div >
                <PhotoView detailText={`<div class=\"media-wrap image-wrap\">
                                            <image src=\"https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg\" />
                                        </div>`} />
                
                
                
               <CodeStatus>{`
import { PhotoView } from "cake-ui"

<PhotoView detailText={ "<div class='media-wrap image-wrap'>
    <image src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg' />
</div>" }/>
            `}</CodeStatus>

                {/* 参数说明 */}
                <h2>组件属性</h2>
                <Doc dataList={propsConfig} />
            </div>
        );
    }

}

export default PhotoViewDemo;