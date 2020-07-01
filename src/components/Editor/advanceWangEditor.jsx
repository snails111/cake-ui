import React, { Component } from 'react';
import  WangEditor  from "./wangEditor"; // eslint-disable-line
export default class AdvanceWangEditor extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {

        }
        this.editorContent=''
        this.editor = {};
    }
    componentDidMount() {
        const elem = this.refs.editorElem
        this.editor = new WangEditor(elem)
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        this.editor.customConfig={
            ...this.props,
            onchange:html => {
                this.editorContent = html;
                // console.log(html);
                let content = ""
                if(!this.editorContent||this.editorContent=="<p></p>"||this.editorContent=="<p><br></p>"){
                    content =  ""
                }else{
                    content =  this.editorContent
                }
                if(this.props.onChange){
                    this.props.onChange(content);
                }
            },
            menus:this.props.menus||['head', 'bold', 'fontSize', 'fontName', 'italic', 'underline', 'strikeThrough', 'foreColor', 'backColor', 'link', 'list', 'justify', 'quote', 'emoticon', 'image','upFile', 'undo', 'redo'],
            uploadImgServer:this.props.uploadImgServer || "", // 上传图片地址
        }
        this.editor.create()
        this.editor.txt.html(this.props.value||"");
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.value!==this.props.value&&nextProps.value!==this.editorContent){
            this.editor.txt.html(nextProps.value||"");
        }
    }
    returnHtmlContent = () => {
        if(!this.editorContent||this.editorContent=="<p></p>"||this.editorContent=="<p><br></p>"){
            return ""
        }
        return this.editorContent
    }
    render() {
        return (
            <div className="App">
                <div ref="editorElem" style={{textAlign: 'left',width:this.props.width||"100%",minWidth:"620px"}} />
            </div>
        );
    }

}
