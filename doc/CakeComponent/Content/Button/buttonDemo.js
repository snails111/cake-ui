import React from "react";
import CodeStatus from "../../../components/codeStatus.jsx";
import Doc from "../../../components/doc.jsx";
import { Button,Radio,Menu, Dropdown } from "antd";
import { DownloadOutlined,DownOutlined  } from '@ant-design/icons';

//组件属性
const propsConfig = [
    {
      key: "disabled",
      param: "disabled",
      explain: "禁用按钮",
      type: "boolean",
      defaultValue: "false",
    },
    {
      key: "href",
      param: "href",
      explain: "跳转地址,同<a/>",
      type: "string",
      defaultValue: "",
    },
    {
      key: "target",
      param: "target",
      explain: "跳转窗口,同<a target='_blank'/>",
      type: "string",
      defaultValue: "",
    },
    {
      key: "icon",
      param: "icon",
      explain: "按钮左侧图标",
      type: "ReactNode",
      defaultValue: "",
    },
    {
      key: "loading",
      param: "loading",
      explain: "按钮载入状态",
      type: "boolean",
      defaultValue: "false",
    },
    {
      key: "shape",
      param: "shape",
      explain: "按钮外形",
      type: "string",
      defaultValue: "'','circle','round'",
    },
    {
      key: "size",
      param: "size",
      explain: "按钮大小",
      type: "string",
      defaultValue: "'middle'(默认),'large','small'",
    },
    {
      key: "type",
      param: "type",
      explain: "按钮大小",
      type: "string",
      defaultValue: "''(默认),'primary','dashed','link'",
    },
    {
      key: "onClick",
      param: "onClick",
      explain: "按钮回调",
      type: "function",
      defaultValue: "(e)=>{}",
    },
    {
      key: "danger",
      param: "danger",
      explain: "危险按钮",
      type: "boolean",
      defaultValue: "false",
    },
]


/*
 * Button 树形控件示例
 * author：徐静
 * date：2020.05.09
 * */
export default class ButtonDemo extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
   
    render() {
        const menu = (
          <Menu onClick={(e)=>{}}>
            <Menu.Item key="1">1st item</Menu.Item>
            <Menu.Item key="2">2nd item</Menu.Item>
            <Menu.Item key="3">3rd item</Menu.Item>
          </Menu>
        );
        

        return (
            <div>
                <h2>按钮 示例</h2>

                <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap"}}>
                    {/* 简单版 */}
                    <div style={{width:"48%"}}>
                        <div style={{width:"460px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                          <Button type="primary" size={"small"}>按钮</Button>
                          <Button type="primary">按钮</Button>
                          <Button type="primary" size={"large"}>按钮</Button>

                          <Button size={"small"}>按钮</Button>
                          <Button>按钮</Button>
                          <Button size={"large"}>按钮</Button>
                        </div>
                        

                        <CodeStatus>{`
import { Button } from "antd"

<Button type="primary" size={"small"}>按钮</Button>
<Button type="primary">按钮</Button>
<Button type="primary" size={"large"}>按钮</Button>

<Button size={"small"}>按钮</Button>
<Button>按钮</Button>
<Button size={"large"}>按钮</Button>
                        `}</CodeStatus>

                    </div>

                    {/* 带Icon版 */}
                    <div style={{width:"48%"}}>
                        <div style={{width:"560px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                          <Button type="primary" size={"small"} icon={<DownloadOutlined />}>按钮</Button>
                          <Button type="primary" icon={<DownloadOutlined />}>按钮</Button>
                          <Button type="primary" size={"large"} icon={<DownloadOutlined />}>按钮</Button>

                          <Button size={"small"} icon={<DownloadOutlined />}>按钮</Button>
                          <Button icon={<DownloadOutlined />}>按钮</Button>
                          <Button size={"large"} icon={<DownloadOutlined />}>按钮</Button>
                        </div>

                        <CodeStatus>{`
import { Button } from "antd"
import { DownloadOutlined } from '@ant-design/icons';

<Button type="primary" size={"small"} icon={<DownloadOutlined />}>按钮</Button>
<Button type="primary" icon={<DownloadOutlined />}>按钮</Button>
<Button type="primary" size={"large"} icon={<DownloadOutlined />}>按钮</Button>

<Button size={"small"} icon={<DownloadOutlined />}>按钮</Button>
<Button icon={<DownloadOutlined />}>按钮</Button>
<Button size={"large"} icon={<DownloadOutlined />}>按钮</Button>
                        `}</CodeStatus>
                    </div>


                    {/* 圆形版 */}
                    <div style={{width:"48%"}}>
                        <div style={{width:"460px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                          <Button type="primary" icon={<DownloadOutlined />} shape="round"/>
                          <Button icon={<DownloadOutlined />} shape="round"/>

                          <Button type="primary" size={"small"} icon={<DownloadOutlined />} shape="circle"/>
                          <Button type="primary" icon={<DownloadOutlined />} shape="circle"/>
                          <Button type="primary" size={"large"} icon={<DownloadOutlined />} shape="circle"/>

                          <Button size={"small"} icon={<DownloadOutlined />} shape="circle"/>
                          <Button icon={<DownloadOutlined />} shape="circle"/>
                          <Button size={"large"} icon={<DownloadOutlined />} shape="circle"/>
                        </div>

                        <CodeStatus>{`
import { Button } from "antd"
import { DownloadOutlined } from '@ant-design/icons';

<Button type="primary" icon={<DownloadOutlined />} shape="round"/>
<Button icon={<DownloadOutlined />} shape="round"/>

<Button type="primary" size={"small"} icon={<DownloadOutlined />} shape="circle"/>
<Button type="primary" icon={<DownloadOutlined />} shape="circle"/>
<Button type="primary" size={"large"} icon={<DownloadOutlined />} shape="circle"/>

<Button size={"small"} icon={<DownloadOutlined />} shape="circle"/>
<Button icon={<DownloadOutlined />} shape="circle"/>
<Button size={"large"} icon={<DownloadOutlined />} shape="circle"/>
                        `}</CodeStatus>
                    </div>


                    {/* 类型版 */}
                    <div style={{width:"48%"}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap"}}>
                          <Button type="dashed">按钮</Button>
                          <Button type="dashed" icon={<DownloadOutlined />}>按钮</Button>
                          <Button type="dashed" icon={<DownloadOutlined />} shape="circle"/>

                          <Button danger>按钮</Button>
                          <Button type="dashed" danger>按钮</Button>
                          <Button type="dashed" disabled danger>按钮</Button>
                          <br/>

                          <Button disabled>按钮</Button>
                          <Button type="dashed" disabled>按钮</Button>
                          <Button type="dashed" disabled shape="round">按钮</Button>
                        </div>

                        <CodeStatus>{`
import { Button } from "antd"
import { DownloadOutlined } from '@ant-design/icons';

<Button type="dashed">按钮</Button>
<Button type="dashed" icon={<DownloadOutlined />}>按钮</Button>
<Button type="dashed" icon={<DownloadOutlined />} shape="circle"/>

<Button danger>按钮</Button>
<Button type="dashed" danger>按钮</Button>
<Button type="dashed" disabled danger>按钮</Button>

<Button disabled>按钮</Button>
<Button type="dashed" disabled>按钮</Button>
<Button type="dashed" disabled shape="round">按钮</Button>
                        `}</CodeStatus>
                    </div>


                    {/* 按钮组合单选版 */}
                    <div style={{width:"48%"}}>
                        <div style={{width:"460px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                            <Radio.Group defaultValue={"hangzhou"} onChange={(e)=>{}}>
                              <Radio.Button value="hangzhou">杭州</Radio.Button>
                              <Radio.Button value="shanghai">上海</Radio.Button>
                              <Radio.Button value="beijing">北京</Radio.Button>
                              <Radio.Button value="chengdu">成都</Radio.Button>
                            </Radio.Group>
                            <Radio.Group size="small" disabled defaultValue={"hangzhou"} onChange={(e)=>{}}>
                              <Radio.Button value="hangzhou">杭州</Radio.Button>
                              <Radio.Button value="shanghai">上海</Radio.Button>
                              <Radio.Button value="beijing">北京</Radio.Button>
                              <Radio.Button value="chengdu">成都</Radio.Button>
                            </Radio.Group>
                        </div>

                        <CodeStatus>{`
import { Button,Radio } from "antd";

<Radio.Group defaultValue={"hangzhou"} onChange={(e)=>{}}>
  <Radio.Button value="hangzhou">杭州</Radio.Button>
  <Radio.Button value="shanghai">上海</Radio.Button>
  <Radio.Button value="beijing">北京</Radio.Button>
  <Radio.Button value="chengdu">成都</Radio.Button>
</Radio.Group>

<Radio.Group size="small" disabled defaultValue={"hangzhou"} onChange={(e)=>{}}>
  <Radio.Button value="hangzhou">杭州</Radio.Button>
  <Radio.Button value="shanghai">上海</Radio.Button>
  <Radio.Button value="beijing">北京</Radio.Button>
  <Radio.Button value="chengdu">成都</Radio.Button>
</Radio.Group>
                        `}</CodeStatus>

                    </div>


                    {/* 带dropdown版 */}
                    <div style={{width:"48%"}}>
                        <div>
                            <Dropdown overlay={menu}>
                              <Button>
                                菜单按钮 <DownOutlined />
                              </Button>
                            </Dropdown>
                        </div>

                        <CodeStatus>{`
import { Button,Menu, Dropdown } from "antd"
import { DownOutlined } from '@ant-design/icons';

const menu = (
  <Menu onClick={(e)=>{}}>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);

<Dropdown overlay={menu}>
  <Button>
    菜单按钮 <DownOutlined />
  </Button>
</Dropdown>
                        `}</CodeStatus>
                    </div>

                    
                </div>
                
                {/* 参数说明 */}
                <h2>组件属性</h2>
                <Doc dataList={propsConfig} />

            </div>
        )
    }
}

