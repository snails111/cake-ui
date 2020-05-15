import React, { Component } from 'react';
import CodeStatus from "../../../components/codeStatus.jsx"
import Doc from "../../../components/doc.jsx";
import { Radio,Space,Checkbox } from "antd";

//Radio属性
const radioConfig = [
  {
      key: "defaultChecked",
      param: "defaultChecked",
      explain: "初始是否选中",
      type: "boolean",
      defaultValue: "false"
  },
  {
      key: "checked",
      param: "checked",
      explain: "当前是否选中",
      type: "boolean",
      defaultValue: "false"
  },
  {
      key: "disabled",
      param: "disabled",
      explain: "是否禁用",
      type: "boolean",
      defaultValue: "false"
  },
  {
      key: "value",
      param: "value",
      explain: "radio的value值",
      type: "any",
      defaultValue: ""
  },
];
// Radio.Group属性
const radioGroupConfig=[
  {
      key: "options",
      param: "options",
      explain: "以配置形式设置子元素可选项",
      type: "array",
      defaultValue: "[]"
  },
  {
      key: "defaultValue",
      param: "defaultValue",
      explain: "初始选中值",
      type: "any",
      defaultValue: ""
  },
  {
      key: "value",
      param: "value",
      explain: "当前选中值",
      type: "any",
      defaultValue: ""
  },
  {
      key: "disabled",
      param: "disabled",
      explain: "禁选所有子单选器",
      type: "boolean",
      defaultValue: "false"
  },
  {
      key: "onChange",
      param: "onChange",
      explain: "变化时的回调",
      type: "function",
      defaultValue: "(checkedValue)=>{}"
  },
  {
      key: "size",
      param: "size",
      explain: "大小，只对Radio.Button生效",
      type: "string",
      defaultValue: "large、middle（默认）、small"
  },
  {
      key: "buttonStyle",
      param: "buttonStyle",
      explain: "Radio.Button的风格样式",
      type: "string",
      defaultValue: "outline（默认描边）、solid（填充）"
  },
]

// Checkbox属性
const checkboxConfig = [
    {
        key: "defaultChecked",
        param: "defaultChecked",
        explain: "初始是否选中",
        type: "boolean",
        defaultValue: "false"
    },
    {
        key: "checked",
        param: "checked",
        explain: "当前是否选中",
        type: "boolean",
        defaultValue: "false"
    },
    {
        key: "disabled",
        param: "disabled",
        explain: "是否禁用",
        type: "boolean",
        defaultValue: "false"
    },
    {
        key: "onChange",
        param: "onChange",
        explain: "变化时的回调",
        type: "function",
        defaultValue: "(e)=>{}"
    },
];
// Checkbox.Group属性
const checkboxGroupConfig=[
    {
        key: "options",
        param: "options",
        explain: "可选项",
        type: "array",
        defaultValue: "[]"
    },
    {
        key: "defaultValue",
        param: "defaultValue",
        explain: "初始选中数组",
        type: "array",
        defaultValue: "[]"
    },
    {
        key: "value",
        param: "value",
        explain: "选中数组",
        type: "array",
        defaultValue: "[]"
    },
    {
        key: "disabled",
        param: "disabled",
        explain: "是否禁用整组",
        type: "boolean",
        defaultValue: "false"
    },
    {
        key: "onChange",
        param: "onChange",
        explain: "变化时的回调",
        type: "function",
        defaultValue: "(checkedValue)=>{}"
    },
]

export default class RadioDemo extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          value: 1,
        }
    }
    

    render() {
      const options=[
        { label: 'Apple', value: 'Apple' },
        { label: 'Pear', value: 'Pear' },
        { label: 'Orange', value: 'Orange' },
        { label: 'Banana', value: 'Banana', disabled:true },
      ]
    

      return (
           <div>
              <h2>单选与多选 示例</h2>


              <div style={{display:"flex",justifyContent:"space-between"}}>

                  {/* 单选 */}
                  <div style={{width:"48%"}}>

                    <Space size={26}>
                        <Radio.Group value={this.state.value} onChange={(e)=>{this.setState({value:e.target.value})}} >
                          <Radio value={1}>A</Radio>
                          <Radio value={2}>B</Radio>
                          <Radio value={3}>C</Radio>
                          <Radio value={4}>D</Radio>
                          <Radio value={5} disabled>E</Radio>
                        </Radio.Group>
                        <Radio.Group defaultValue={1} disabled>
                          <Radio value={1}>A</Radio>
                          <Radio value={2}>B</Radio>
                          <Radio value={3}>C</Radio>
                        </Radio.Group>
                    </Space>
                    <Space size={20}>
                        <Radio.Group defaultValue="a" buttonStyle="solid">
                          <Radio.Button value="a">杭州</Radio.Button>
                          <Radio.Button value="b">上海</Radio.Button>
                          <Radio.Button value="c">北京</Radio.Button>
                          <Radio.Button value="d">成都</Radio.Button>
                        </Radio.Group>
                        <Radio.Group defaultValue="a" size="small">
                          <Radio.Button value="a">杭州</Radio.Button>
                          <Radio.Button value="b">上海</Radio.Button>
                          <Radio.Button value="c">北京</Radio.Button>
                          <Radio.Button value="d">成都</Radio.Button>
                        </Radio.Group>
                    </Space>

                    <CodeStatus>{`
import { Transfer } from "cake-ui"

this.state = {
  value: 1,
}

<Radio.Group value={this.state.value} onChange={(e)=>{this.setState({value:e.target.value})}} >
  <Radio value={1}>A</Radio>
  <Radio value={2}>B</Radio>
  <Radio value={3}>C</Radio>
  <Radio value={4}>D</Radio>
  <Radio value={5} disabled>E</Radio>
</Radio.Group>
<Radio.Group defaultValue={1} disabled>
  <Radio value={1}>A</Radio>
  <Radio value={2}>B</Radio>
  <Radio value={3}>C</Radio>
</Radio.Group>

<Radio.Group defaultValue="a" buttonStyle="solid">
  <Radio.Button value="a">杭州</Radio.Button>
  <Radio.Button value="b">上海</Radio.Button>
  <Radio.Button value="c">北京</Radio.Button>
  <Radio.Button value="d">成都</Radio.Button>
</Radio.Group>
<Radio.Group defaultValue="a" size="small">
  <Radio.Button value="a">杭州</Radio.Button>
  <Radio.Button value="b">上海</Radio.Button>
  <Radio.Button value="c">北京</Radio.Button>
  <Radio.Button value="d">成都</Radio.Button>
</Radio.Group>
                    `}</CodeStatus>
                  </div>



                  {/* 多选 */}
                  <div style={{width:"48%"}}>
                    <Checkbox.Group options={options} defaultValue={['Apple']} onChange={(checkedValues)=>{}} />
                    <Checkbox.Group options={options} defaultValue={['Apple']} disabled />

                    <CodeStatus>{`
import { Checkbox } from "cake-ui"

const options=${JSON.stringify(options, null, 2)}

<Checkbox.Group options={options} defaultValue={['Apple']} onChange={(checkedValues)=>{}} />
<Checkbox.Group options={options} defaultValue={['Apple']} disabled />
                    `}</CodeStatus>
                  </div>

              </div>

               

              {/* 单选 */}
              <h2>Radio属性</h2>
              <Doc dataList={radioConfig} />
              <h2>Radio.Group属性</h2>
              <Doc dataList={radioGroupConfig} />

              {/* 多选 */}
              <h2>Checkbox属性</h2>
              <Doc dataList={checkboxConfig} />
              <h2>Checkbox.Group属性</h2>
              <Doc dataList={checkboxGroupConfig} />
           </div>
        );
    }
}
