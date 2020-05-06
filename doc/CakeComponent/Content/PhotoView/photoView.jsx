import React, { Component } from 'react';
import { PhotoView } from "cake-ui"; 
import CodeStatus from "../../../components/codeStatus.jsx"
import CodeLight from "../../../components/codeLight.jsx"

var  codeString = `

class PhotoViewDemo extends Component {
    render() {
        return (
            <div >
                <PhotoView detailText={"<div class=\"media-wrap image-wrap\"><img src=\"https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg\"/></div>"} />
            </div>
        );
    }

}

`;

class PhotoViewDemo extends CodeStatus{
    render() {
        const { isCodeCollpase } = this.state
        return (
            <div >
                <PhotoView detailText={`<div class=\"media-wrap image-wrap\">
                                            <image src=\"https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg\" />
                                        </div>`} />
                {this.controlCode()}
                <CodeLight isCodeCollpase={isCodeCollpase} codeString={codeString}/>
            </div>
        );
    }

}

export default PhotoViewDemo;