import React, { Component } from 'react';
import CodeStatus from "../../../components/codeStatus.jsx"
import Doc from "../../../components/doc.jsx";
import { Badge,Tag,Menu, Dropdown  } from "antd";
import { NotificationOutlined,CaretDownOutlined  } from '@ant-design/icons';

//组件属性
const propsConfig = [
    {
        key: "color",
        param: "color",
        explain: "自定义小圆点的颜色",
        type: "String",
        defaultValue: ""
    },
    {
        key: "count",
        param: "count",
        explain: "展示的数字(为0时隐藏)",
        type: "number|ReactNode",
        defaultValue: ""
    },
    {
        key: "dot",
        param: "dot",
        explain: "不展示数字，只有一个小红点",
        type: "boolean",
        defaultValue: "false"
    },
    {
        key: "offset",
        param: "offset",
        explain: "状态点的位置偏移，格式为 [x, y]",
        type: "array",
        defaultValue: "[0,0]"
    },
    {
        key: "overflowCount",
        param: "overflowCount",
        explain: "封顶的数字值",
        type: "number",
        defaultValue: "99"
    },
    {
        key: "showZero",
        param: "showZero",
        explain: "当数值为 0 时，是否展示 Badge",
        type: "boolean",
        defaultValue: "false"
    },
    {
        key: "status",
        param: "status",
        explain: "设置 Badge 为状态点",
        type: "string",
        defaultValue: "success | processing | default | error | warning"
    },
    {
        key: "text",
        param: "text",
        explain: "在设置了 status 的前提下有效，设置状态点的文本",
        type: "string",
        defaultValue: ""
    },
    {
        key: "title",
        param: "title",
        explain: "鼠标放在状态点上时显示的文字",
        type: "string",
        defaultValue: ""
    },
];

export default class BadgeDemo extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        }
    }
    

    render() {
      const menu = (
        <Menu onClick={(e)=>{}}>
          <Menu.Item key="1"><Badge count={12} offset={[0,6]}>评论</Badge></Menu.Item>
          <Menu.Item key="2"><Badge count={3} offset={[0,6]}>回复</Badge></Menu.Item>
        </Menu>
      );
    

      return (
           <div>
              <h2>气泡 示例</h2>


              <div style={{display:"flex",justifyContent:"space-between"}}>

                  {/* 简单版 */}
                  <div style={{width:"48%"}}>
                    <div style={{width:"460px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <Badge count={12}><Tag color="blue">评论</Tag></Badge>
                      <Badge count={3}><Tag color="blue">回复</Tag></Badge>
                      <Badge count={100} overflowCount={99}><Tag color="blue">评论</Tag></Badge>
                      <Badge count={11} overflowCount={10}><Tag color="blue">回复</Tag></Badge>
                      <Badge count={<span style={{background:"#FF4949",color:"#fff",borderRadius:"8px",padding:"2px 6px"}}>New</span>}><Tag color="blue">评论</Tag></Badge>
                      <Badge count={<span style={{background:"#FF4949",color:"#fff",borderRadius:"8px",padding:"2px 6px"}}>Hot</span>}><Tag color="blue">回复</Tag></Badge>
                    </div>
                    

                    <CodeStatus>{`
import { Badge, Tag } from "antd"

<Badge count={12}><Tag color="blue">评论</Tag></Badge>
<Badge count={3}><Tag color="blue">回复</Tag></Badge>
<Badge count={100} overflowCount={99}><Tag color="blue">评论</Tag></Badge>
<Badge count={11} overflowCount={10}><Tag color="blue">回复</Tag></Badge>
<Badge count={<span style={{background:"#FF4949",color:"#fff",borderRadius:"8px",padding:"2px 6px"}}>New</span>}><Tag color="blue">评论</Tag></Badge>
<Badge count={<span style={{background:"#FF4949",color:"#fff",borderRadius:"8px",padding:"2px 6px"}}>Hot</span>}><Tag color="blue">回复</Tag></Badge>
                    `}</CodeStatus>
                  </div>


                  {/* 复杂版 */}
                  <div style={{width:"48%"}}>
                      <div style={{width:"260px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <Badge dot>数据查询</Badge>
                        <Badge dot><NotificationOutlined /></Badge>
                        <Badge dot><span style={{borderRadius:"4px",background:"#20A0FF",color:"#fff",padding:"6px 10px"}}><NotificationOutlined /></span></Badge>

                        <Dropdown overlay={menu}>
                          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            点我查看 <CaretDownOutlined />
                          </a>
                        </Dropdown>
                      </div>

                    <CodeStatus>{`
import { Badge,Menu, Dropdown } from "antd"
import { NotificationOutlined,CaretDownOutlined } from '@ant-design/icons';

const menu = (
  <Menu onClick={(e)=>{}}>
    <Menu.Item key="1"><Badge count={12} offset={[0,6]}>评论</Badge></Menu.Item>
    <Menu.Item key="2"><Badge count={3} offset={[0,6]}>回复</Badge></Menu.Item>
  </Menu>
);

<Badge dot>数据查询</Badge>
<Badge dot><NotificationOutlined /></Badge>
<Badge dot><span style={{borderRadius:"4px",background:"#20A0FF",color:"#fff",padding:"6px 10px"}}><NotificationOutlined /></span></Badge>

<Dropdown overlay={menu}>
  <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
    点我查看 <CaretDownOutlined />
  </a>
</Dropdown>
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
