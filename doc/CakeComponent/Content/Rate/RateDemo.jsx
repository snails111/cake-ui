import React, { Component } from 'react';
import CodeStatus from "../../../components/codeStatus.jsx"
import Doc from "../../../components/doc.jsx";
import { Rate,Space } from "antd";
import { HeartOutlined } from '@ant-design/icons';

//组件属性
const propsConfig = [
    {
        key: "allowHalf",
        param: "allowHalf",
        explain: "是否允许选择半星",
        type: "boolean",
        defaultValue: "false"
    },
    {
        key: "character",
        param: "character",
        explain: "自定义字符",
        type: "ReactNode",
        defaultValue: "<StarFilled />"
    },
    {
        key: "count",
        param: "count",
        explain: "star 总数",
        type: "number",
        defaultValue: "5"
    },
    {
        key: "disabled",
        param: "disabled",
        explain: "是否禁用",
        type: "boolean",
        defaultValue: "false"
    },
    {
        key: "defaultValue",
        param: "defaultValue",
        explain: "默认值",
        type: "number",
        defaultValue: "0"
    },
    {
        key: "value",
        param: "value",
        explain: "当前数，受控值",
        type: "number",
        defaultValue: ""
    },
    {
        key: "onChange",
        param: "onChange",
        explain: "选择时的回调",
        type: "function",
        defaultValue: "(value)=>{}"
    },
    {
        key: "onHoverChange",
        param: "onHoverChange",
        explain: "鼠标经过时数值变化的回调",
        type: "function",
        defaultValue: "(value)=>{}"
    },
    {
        key: "style",
        param: "style",
        explain: "自定义样式对象",
        type: "CSSProperties",
        defaultValue: ""
    },
    {
        key: "className",
        param: "className",
        explain: "自定义样式类名",
        type: "string",
        defaultValue: ""
    },
    {
        key: "tooltips",
        param: "tooltips",
        explain: "自定义每项的提示信息",
        type: "string",
        defaultValue: ""
    },
];

export default class RateDemo extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          value:1,
        }
    }
    

    render() {
      const desc = ['糟糕透了', '差的', '一般', '优秀', '完美'];

      return (
           <div>
              <h2>评价 示例</h2>


              <div style={{display:"flex",justifyContent:"space-between"}}>

                  {/* 简单版 */}
                  <div style={{width:"48%"}}>
                    <Space size={30} align="center">
                      <Rate />
                      <Rate 
                        value={this.state.value} 
                        tooltips={desc} 
                        onChange={(value)=>{
                          this.setState({ value })
                        }} 
                      />
                      {this.state.value?desc[this.state.value-1]:""}
                    </Space>

                    <CodeStatus>{`
import { Rate } from "antd";

this.state = {
  value:1,
}

const desc=${JSON.stringify(desc, null, 2)}

<Rate />
<Rate 
  value={this.state.value} 
  tooltips={desc} 
  onChange={(value)=>{
    this.setState({ value })
  }} 
/>
{this.state.value?desc[this.state.value-1]:""}
                    `}</CodeStatus>
                  </div>


                  {/* 复杂版 */}
                  <div style={{width:"48%"}}>
                    <Space size={30} align="center">
                      <Rate allowHalf defaultValue={2.5} />
                      <Rate allowHalf disabled count={6} defaultValue={3.5} />
                      <Rate character={<HeartOutlined />} allowHalf defaultValue={1.5} />
                    </Space>

                    <CodeStatus>{`
import { Rate } from "antd"
import { HeartOutlined } from '@ant-design/icons';

<Rate allowHalf defaultValue={2.5} />
<Rate allowHalf disabled count={6} defaultValue={3.5} />
<Rate character={<HeartOutlined />} allowHalf defaultValue={1.5} />
                    `}</CodeStatus>
                  </div>

              </div>

               

              {/* 参数说明 */}
              <h2>组件属性</h2>
              <Doc dataList={propsConfig} />
           </div>
        );
    }
}
