import React, { Component } from 'react';
import CodeStatus from "../../../components/codeStatus.jsx"
import Doc from "../../../components/doc.jsx";
import { Switch,Space } from "antd";
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

//组件属性
const propsConfig = [
    {
        key: "checked",
        param: "checked",
        explain: "当前是否选中",
        type: "boolean",
        defaultValue: "false"
    },
    {
        key: "defaultChecked",
        param: "defaultChecked",
        explain: "初始是否选中",
        type: "boolean",
        defaultValue: "false"
    },
    {
        key: "checkedChildren",
        param: "checkedChildren",
        explain: "选中时的内容",
        type: "string|ReactNode",
        defaultValue: ""
    },
    {
        key: "unCheckedChildren",
        param: "unCheckedChildren",
        explain: "未选中时的内容",
        type: "string|ReactNode",
        defaultValue: ""
    },
    {
        key: "disabled",
        param: "disabled",
        explain: "是否禁用",
        type: "boolean",
        defaultValue: "false"
    },
    {
        key: "size",
        param: "size",
        explain: "开关大小",
        type: "string",
        defaultValue: "default(默认)、small"
    },
    {
        key: "onChange",
        param: "onChange",
        explain: "切换回调",
        type: "function",
        defaultValue: "(checked, e)=>{}"
    },
    {
        key: "onClick",
        param: "onClick",
        explain: "点击回调",
        type: "function",
        defaultValue: "(checked, e)=>{}"
    },
    {
        key: "loading",
        param: "loading",
        explain: "加载中的开关",
        type: "boolean",
        defaultValue: "false"
    },
    {
        key: "className",
        param: "className",
        explain: "Switch 类名",
        type: "string",
        defaultValue: ""
    },
];

export default class SwitchDemo extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {

        }
    }
    

    render() {
    
      return (
           <div>
              <h2>开关 示例</h2>

              <Space size={20}>
                <Switch defaultChecked onChange={(checked)=>{}} />
                <Switch size="small" defaultChecked onChange={(checked)=>{}} />
                <Switch disabled defaultChecked onChange={(checked)=>{}} />
                <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
                <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />}/>
              </Space>

              <CodeStatus>{`
import { Switch } from "antd"

<Switch defaultChecked onChange={(checked)=>{}} />
<Switch size="small" defaultChecked onChange={(checked)=>{}} />
<Switch disabled defaultChecked onChange={(checked)=>{}} />
<Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
<Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />}/>
              `}</CodeStatus>


              {/* 参数说明 */}
              <h2>组件属性</h2>
              <Doc dataList={propsConfig} />
           </div>
        );
    }
}
