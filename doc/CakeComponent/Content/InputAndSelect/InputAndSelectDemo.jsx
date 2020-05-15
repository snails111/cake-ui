import React, { Component } from 'react';
import CodeStatus from "../../../components/codeStatus.jsx"
import Doc from "../../../components/doc.jsx";
import { Input,InputNumber,Select,Space } from "antd";
const { TextArea } = Input;
const { Option } = Select;

//组件属性
const propsConfig = [
    {
        key: "allowClear",
        param: "allowClear",
        explain: "是否显示清除按钮",
        type: "boolean",
        defaultValue: "false"
    },
    {
        key: "size",
        param: "size",
        explain: "input大小",
        type: "string",
        defaultValue: "small、middle（默认）、large "
    },
    {
        key: "disabled",
        param: "disabled",
        explain: "是否禁用",
        type: "boolean",
        defaultValue: "false"
    },
    {
        key: "prefix",
        param: "prefix",
        explain: "input前缀图标",
        type: "string|ReactNode",
        defaultValue: ""
    },
    {
        key: "suffix",
        param: "suffix",
        explain: "input后缀图标",
        type: "string|ReactNode",
        defaultValue: ""
    },
    {
        key: "addonBefore",
        param: "addonBefore",
        explain: "input前置标签",
        type: "string|ReactNode",
        defaultValue: ""
    },
    {
        key: "addonAfter",
        param: "addonAfter",
        explain: "input后置标签",
        type: "string|ReactNode",
        defaultValue: ""
    },
    {
        key: "maxLength",
        param: "maxLength",
        explain: "最大长度",
        type: "number",
        defaultValue: ""
    },
    {
        key: "defaultValue",
        param: "defaultValue",
        explain: "默认内容",
        type: "string",
        defaultValue: ""
    },
    {
        key: "value",
        param: "value",
        explain: "输入框内容",
        type: "string",
        defaultValue: ""
    },
    {
        key: "onChange",
        param: "onChange",
        explain: "输入框内容变化时的回调",
        type: "function",
        defaultValue: "(e)=>{}"
    },
    {
        key: "onPressEnter",
        param: "onPressEnter",
        explain: "按下回车的回调",
        type: "function",
        defaultValue: "(e)=>{}"
    },
];
//Input.TextArea属性
const InputTextAreaConfig = [
    {
        key: "allowClear",
        param: "allowClear",
        explain: "是否显示清除按钮",
        type: "boolean",
        defaultValue: "false"
    },
    {
        key: "autoSize",
        param: "autoSize",
        explain: "是否自适应内容高度",
        type: "boolean|object",
        defaultValue: "false | { minRows: 2, maxRows: 6 }"
    },
    {
        key: "defaultValue",
        param: "defaultValue",
        explain: "默认内容",
        type: "string",
        defaultValue: ""
    },
    {
        key: "value",
        param: "value",
        explain: "输入框内容",
        type: "string",
        defaultValue: ""
    },
    {
        key: "onChange",
        param: "onChange",
        explain: "输入框内容变化时的回调",
        type: "function",
        defaultValue: "(e)=>{}"
    },
    {
        key: "onPressEnter",
        param: "onPressEnter",
        explain: "按下回车的回调",
        type: "function",
        defaultValue: "(e)=>{}"
    },
    {
        key: "onResize",
        param: "onResize",
        explain: "resize 回调",
        type: "function",
        defaultValue: "({ width, height })=>{}"
    },
]
//Input.Search属性
const InputSearchConfig = [
    {
        key: "enterButton",
        param: "enterButton",
        explain: "是否有确认按钮",
        type: "boolean|ReactNode",
        defaultValue: "false"
    },
    {
        key: "onSearch",
        param: "onSearch",
        explain: "点击搜索或按下回车键时的回调",
        type: "function",
        defaultValue: "(value,e)=>{}"
    },
    {
        key: "loading",
        param: "loading",
        explain: "搜索 loading",
        type: "boolean",
        defaultValue: "false"
    },
]
//Input.Group属性
const InputGroupConfig = [
    {
        key: "compact",
        param: "compact",
        explain: "是否用紧凑模式",
        type: "boolean",
        defaultValue: "false"
    },
    {
        key: "size",
        param: "size",
        explain: "大小",
        type: "string",
        defaultValue: "small、default（默认）、large"
    },
]

export default class InputDemo extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        }
    }

    render() {
    
      return (
           <div>
              <h2>InputAndSelect 示例</h2>

              <div style={{display:"flex",justifyContent:"space-between"}}>
                  {/* 简单版 */}
                  <div style={{width:"48%"}}>

                    <Space size={20} style={{marginBottom:20}}>
                      <Input placeholder="请输入内容" />
                      <Input placeholder="请输入内容" size="small"/>
                      <Input placeholder="请输入内容" size="large"/>
                      <Input placeholder="请输入内容" disabled/>
                    </Space>
                    <Space size={20} style={{marginBottom:20}}>
                      <Input addonBefore="http://" placeholder="请输入内容" />
                      <Input addonAfter=".com" placeholder="请输入内容" />
                    </Space>

                    <Input.Group compact>
                      <Select defaultValue="1">
                        <Option value="1">用户姓名</Option>
                        <Option value="2">餐厅名</Option>
                        <Option value="3">订单号</Option>
                      </Select>
                      <Input.Search style={{ width: '50%' }} placeholder="请输入内容" />
                      
                    </Input.Group>
                    

                    <CodeStatus>{`
import { Input,Select } from "antd";
const { Option } = Select;

<Input placeholder="请输入内容" />
<Input placeholder="请输入内容" size="small"/>
<Input placeholder="请输入内容" size="large"/>
<Input placeholder="请输入内容" disabled/>

<Input addonBefore="http://" placeholder="请输入内容" />
<Input addonAfter=".com" placeholder="请输入内容" />

<Input.Group compact>
  <Select defaultValue="1">
    <Option value="1">用户姓名</Option>
    <Option value="2">餐厅名</Option>
    <Option value="3">订单号</Option>
  </Select>
  <Input.Search style={{ width: '50%' }} placeholder="请输入内容" />
</Input.Group>
                    `}</CodeStatus>
                  </div>


                  {/* 复杂版 */}
                  <div style={{width:"48%"}}>
                    <TextArea rows={3} placeholder="请输入内容" />

                    <Space size={20} style={{margin:"12px 0"}}>
                      <InputNumber min={1} max={10} placeholder="请输入数字" style={{width:"200px"}}/>
                      <InputNumber min={1} max={10} placeholder="请输入数字" style={{width:"200px"}} disabled/>
                    </Space>

                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="请选择"
                        defaultValue={['1']}
                        onChange={()=>{}}
                      >
                      <Option value="1">用户姓名</Option>
                      <Option value="2">餐厅名</Option>
                      <Option value="3">订单号</Option>
                    </Select>


                    <CodeStatus>{`
import { Input,InputNumber,Select } from "antd";
const { TextArea } = Input;
const { Option } = Select;

<TextArea rows={3} placeholder="请输入内容" />

<InputNumber min={1} max={10} placeholder="请输入数字" style={{width:"200px"}}/>
<InputNumber min={1} max={10} placeholder="请输入数字" style={{width:"200px"}} disabled/>

<Select
  mode="multiple"
  style={{ width: '100%' }}
  placeholder="请选择"
  defaultValue={['1']}
  onChange={()=>{}}
>
  <Option value="1">用户姓名</Option>
  <Option value="2">餐厅名</Option>
  <Option value="3">订单号</Option>
</Select>
                    `}</CodeStatus>
                  </div>

              </div>
               

              {/* 参数说明 */}
              <h2>组件属性</h2>
              <Doc dataList={propsConfig} />
              <h2>Input.TextArea属性</h2>
              <Doc dataList={InputTextAreaConfig} />
              <h2>Input.Search属性</h2>
              <Doc dataList={InputSearchConfig} />
              <h2>Input.Group属性</h2>
              <Doc dataList={InputGroupConfig} />
           </div>
        );
    }
}
