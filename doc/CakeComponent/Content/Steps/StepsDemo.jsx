import React, { Component } from 'react';
import CodeStatus from "../../../components/codeStatus.jsx"
import Doc from "../../../components/doc.jsx";
import { Steps  } from "antd";
import { UserOutlined, SolutionOutlined, CreditCardOutlined, SmileOutlined } from '@ant-design/icons';
const { Step } = Steps;

//组件属性
const propsConfig = [
    {
        key: "className",
        param: "className",
        explain: "步骤条类名",
        type: "String",
        defaultValue: ""
    },
    {
        key: "type",
        param: "type",
        explain: "步骤条类型",
        type: "String",
        defaultValue: "default(默认)、navigation"
    },
    {
        key: "current",
        param: "current",
        explain: "当前步骤(从 0 开始记数, status 属性可覆盖该状态)",
        type: "number",
        defaultValue: "0"
    },
    {
        key: "status",
        param: "status",
        explain: "当前步骤的状态",
        type: "string",
        defaultValue: "process(默认)、wait、finish、error"
    },
    {
        key: "direction",
        param: "direction",
        explain: "步骤条方向",
        type: "string",
        defaultValue: "horizontal(默认)、vertical"
    },
    {
        key: "labelPlacement",
        param: "labelPlacement",
        explain: "标签放置位置",
        type: "string",
        defaultValue: "horizontal(默认)、vertical"
    },
    {
        key: "progressDot",
        param: "progressDot",
        explain: "点状步骤条",
        type: "boolean|function",
        defaultValue: "false | (iconDot, step)=>ReactNode"
    },
    {
        key: "size",
        param: "size",
        explain: "步骤条大小",
        type: "string",
        defaultValue: "default(默认)、small"
    },
    {
        key: "onChange",
        param: "onChange",
        explain: "切换步骤回调",
        type: "function",
        defaultValue: "(current) => void"
    },
];

export default class BadgeDemo extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          current:0
        }
    }
    

    render() {
    

      return (
           <div>
              <h2>步骤条 示例</h2>

              <div style={{display:"flex",justifyContent:"space-between"}}>

                  {/* 简单版 */}
                  <div style={{width:"48%"}}>

                    <Steps current={1} style={{marginBottom:20}}>
                      <Step title="提交完成" description="提交描述" />
                      <Step title="正在处理" description="处理描述" />
                      <Step title="审核通过" description="内容已通过审核" />
                    </Steps>
                    <Steps current={1} size="small" style={{marginBottom:20}}>
                      <Step title="已完成" description="" />
                      <Step title="当前项" description="" />
                      <Step title="未完成" description="" />
                    </Steps>
                    <Steps>
                      <Step status="finish" title="登录系统" icon={<UserOutlined />} />
                      <Step status="finish" title="信息核对" icon={<SolutionOutlined />} />
                      <Step status="process" title="付款成功" icon={<CreditCardOutlined />} />
                      <Step status="wait" title="完成" icon={<SmileOutlined />} />
                    </Steps>

                    <CodeStatus>{`
import { Steps  } from "antd";
import { UserOutlined, SolutionOutlined, CreditCardOutlined, SmileOutlined } from '@ant-design/icons';
const { Step } = Steps;

<Steps current={1}>
  <Step title="提交完成" description="" />
  <Step title="正在处理" subTitle="Left 00:00:08" description="" />
  <Step title="审核通过" description="" />
</Steps>
<Steps current={1} size="small">
  <Step title="已完成" description="" />
  <Step title="当前项" description="" />
  <Step title="未完成" description="" />
</Steps>
<Steps>
  <Step status="finish" title="登录系统" icon={<UserOutlined />} />
  <Step status="finish" title="信息核对" icon={<SolutionOutlined />} />
  <Step status="process" title="付款成功" icon={<CreditCardOutlined />} />
  <Step status="wait" title="完成" icon={<SmileOutlined />} />
</Steps>
                    `}</CodeStatus>
                  </div>


                  {/* 竖版 */}
                  <div style={{width:"48%"}}>
                    <div style={{width:"400px",display:"flex",justifyContent:"space-between"}}>
                      <Steps direction="vertical" current={1}>
                        <Step title="安装协议" description="描述文案..." />
                        <Step title="安装位置" description="描述文案..." />
                        <Step title="正在安装" description="描述文案..." />
                      </Steps>
                      <Steps direction="vertical" size="small" current={this.state.current} onChange={(current )=>{this.setState({current})}}>
                        <Step title="安装协议" description="描述文案..." />
                        <Step title="安装位置" description="描述文案..." />
                        <Step title="正在安装" description="描述文案..." />
                      </Steps>
                    </div>

                    <CodeStatus>{`
import { Steps  } from "antd";
const { Step } = Steps;

this.state = {
  current:0
}

<Steps direction="vertical" current={1}>
  <Step title="安装协议" description="描述文案..." />
  <Step title="安装位置" description="描述文案..." />
  <Step title="正在安装" description="描述文案..." />
</Steps>
<Steps direction="vertical" size="small" 
  current={this.state.current} 
  onChange={(current )=>{this.setState({current})}}
>
  <Step title="安装协议" description="描述文案..." />
  <Step title="安装位置" description="描述文案..." />
  <Step title="正在安装" description="描述文案..." />
</Steps>
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
