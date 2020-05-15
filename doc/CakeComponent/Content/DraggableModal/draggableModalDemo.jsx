import React, { Component } from "react";
import CodeStatus from "../../../components/codeStatus.jsx"
import Doc from "../../../components/doc.jsx";
import { DraggableModal } from "cake-ui/src";
import { Button } from "antd";

//组件属性
const propsConfig = [
    {
      key: "1",
      param: "width",
      explain: "弹出框宽度",
      type: "number",
      defaultValue: "520"
    },
    {
      key: "2",
      param: "top",
      explain: "距离顶部距离",
      type: "number",
      defaultValue: "100"
    },
    {
      key: "3",
      param: "title",
      explain: "弹出框标题",
      type: "string",
      defaultValue: "Drag-Modal"
    },
    {
      key: "4",
      param: "visible",
      explain: "弹出框是否显示",
      type: "boolean",
      defaultValue: "false"
    },
    {
      key: "5",
      param: "wrapClassName",
      explain: "给元素添加额外的class",
      type: "string",
      defaultValue: ""
    },
    {
      key: "6",
      param: "afterCloseToInitPosition",
      explain: "拖动弹框关闭后是否回归初始位置",
      type: "boolean",
      defaultValue: "true"
    }
];

export default class DraggableModalTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible:false,
        };
    }

    render() {

        return (
            <div>
                <h2>DraggableModal 示例：</h2>
                <Button type="primary" onClick={()=>{this.setState({modalVisible:true})}}>点击</Button>

                <DraggableModal
                    title="拖拽弹框示例"
                    visible={this.state.modalVisible}
                    width={700}
                    centered
                    closable={false} // 是否显示右上角的关闭按钮
                    maskClosable={false} // 点击蒙层是否允许关闭
                    destroyOnClose // 关闭时销毁 Modal 里的子元素
                    onOk={()=>{}} 
                    onCancel={()=>{this.setState({modalVisible:false})}}
                    ref={(ins)=>{this.modalInstance=ins}}
                    bodyStyle={{padding:20}}
                >
                    自定义内容
                </DraggableModal>


                <CodeStatus>{`
import { DraggableModal } from "cake-ui"

<DraggableModal
  title="拖拽弹框示例"
  visible={this.state.modalVisible}
  width={700}
  centered
  closable={false} // 是否显示右上角的关闭按钮
  maskClosable={false} // 点击蒙层是否允许关闭
  destroyOnClose // 关闭时销毁 Modal 里的子元素
  onOk={()=>{}} 
  onCancel={()=>{this.setState({modalVisible:false})}}
  ref={(ins)=>{this.modalInstance=ins}}
  bodyStyle={{padding:20}}
>
    自定义内容
</DraggableModal>
                `}</CodeStatus>


                {/* 参数说明 */}
                <h2>组件属性</h2>
                <Doc dataList={propsConfig} />
            </div>
        )
    }
}

