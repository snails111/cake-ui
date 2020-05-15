import React from "react"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import style from 'react-syntax-highlighter/dist/esm/styles/prism/darcula'; 
import { message,Typography } from "antd"
import {CopyOutlined,DownOutlined,UpOutlined} from "@ant-design/icons"

const { Paragraph } = Typography;
/*
* js生成uuid 唯一标志符
* */
const uuid=()=> {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

export default class CodeStatus extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isCodeCollpase:false
        }
        this.id=uuid()
    }

    // 折叠收缩
    changeStatus=()=>{
        this.setState(prevState=>{
            return {isCodeCollpase:!prevState.isCodeCollpase}
        })
    }

    // 一键复制
    copyFn=()=>{
        const range = document.createRange();
        range.selectNodeContents(document.getElementById(this.id));
        const selection = window.getSelection();
        if(selection.rangeCount > 0) selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('Copy');// 执行浏览器复制命令
        message.success('复制成功');
    }

    render(){
        const { isCodeCollpase } = this.state;

        return (
            <div style={{margin:"20px 0"}}>
                <div style={{border:"1px dashed #ddd",borderRadius:"4px",padding:"8px 20px",textAlign:"right"}}>
                    <CopyOutlined onClick={this.copyFn} style={{marginRight:24}}/>
                    {
                        isCodeCollpase ?
                            <DownOutlined onClick={this.changeStatus}/> :
                            <UpOutlined onClick={this.changeStatus}/>
                    }
                </div>
               
                <div id={this.id}>
                    {isCodeCollpase ? 
                        <SyntaxHighlighter 
                            language='jsx' 
                            style={style}
                            showLineNumbers={true}
                            wrapLines={true}
                        >
                            {this.props.children.replace(/^\s+|\s+$/g, '')}
                        </SyntaxHighlighter> : null
                    }
                </div>
            </div>
        )
    }
}