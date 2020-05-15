import React, { Component } from 'react';
import CodeStatus from "../../../components/codeStatus.jsx"
import Doc from "../../../components/doc.jsx";
import { Breadcrumb } from "antd";
import { HomeOutlined, FolderOpenOutlined, UserOutlined } from '@ant-design/icons'

//组件属性
const propsConfig = [
    {
        key: "separator",
        param: "separator",
        explain: "自定义分隔符",
        type: "string|ReactNode",
        defaultValue: ""
    },
];
// Breadcrumb.Item属性
const breadcrumbItemConfig=[
    {
        key: "href",
        param: "href",
        explain: "链接地址",
        type: "string",
        defaultValue: ""
    },
    {
        key: "onClick",
        param: "onClick",
        explain: "单击事件",
        type: "function",
        defaultValue: "(e)=>{}"
    },
    {
        key: "overlay",
        param: "overlay",
        explain: "下拉菜单的内容",
        type: "ReactNode",
        defaultValue: ""
    },
    {
        key: "dropdownProps",
        param: "dropdownProps",
        explain: "弹出下拉菜单的自定义配置",
        type: "Dropdown",
        defaultValue: "同Dropdown"
    },
]

export default class BreadcrumbDemo extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        }
    }

    render() {
    
      return (
           <div>
              <h2>面包屑 示例</h2>


              <div style={{display:"flex",justifyContent:"space-between"}}>

                  {/* 简单版 */}
                  <div style={{width:"33%"}}>
                    <Breadcrumb>
                      <Breadcrumb.Item><a href="">一级菜单</a></Breadcrumb.Item>
                      <Breadcrumb.Item><a href="">二级菜单</a></Breadcrumb.Item>
                      <Breadcrumb.Item>三级菜单</Breadcrumb.Item>
                    </Breadcrumb>
                     

                    <CodeStatus>{`
import { Breadcrumb } from "antd";

<Breadcrumb>
  <Breadcrumb.Item href="">一级菜单</Breadcrumb.Item>
  <Breadcrumb.Item href="">二级菜单</Breadcrumb.Item>
  <Breadcrumb.Item>三级菜单</Breadcrumb.Item>
</Breadcrumb>
                    `}</CodeStatus>
                  </div>


                  {/* Icon版 */}
                  <div style={{width:"33%"}}>
                      <Breadcrumb>
                        <Breadcrumb.Item href=""><HomeOutlined /><span>一级菜单</span></Breadcrumb.Item>
                        <Breadcrumb.Item href=""><FolderOpenOutlined /><span>二级菜单</span></Breadcrumb.Item>
                        <Breadcrumb.Item><UserOutlined /><span>三级菜单</span></Breadcrumb.Item>
                      </Breadcrumb>

                    <CodeStatus>{`
import { Breadcrumb } from "antd";
import { HomeOutlined, FolderOpenOutlined, UserOutlined } from '@ant-design/icons'

<Breadcrumb>
  <Breadcrumb.Item href=""><HomeOutlined /><span>一级菜单</span></Breadcrumb.Item>
  <Breadcrumb.Item href=""><FolderOpenOutlined /><span>二级菜单</span></Breadcrumb.Item>
  <Breadcrumb.Item><UserOutlined /><span>三级菜单</span></Breadcrumb.Item>
</Breadcrumb>
                    `}</CodeStatus>
                  </div>


                  {/* 分隔符版 */}
                  <div style={{width:"33%"}}>
                    <Breadcrumb separator=">">
                      <Breadcrumb.Item><a href="">一级菜单</a></Breadcrumb.Item>
                      <Breadcrumb.Item><a href="">二级菜单</a></Breadcrumb.Item>
                      <Breadcrumb.Item>三级菜单</Breadcrumb.Item>
                    </Breadcrumb>

                    <CodeStatus>{`
import { Breadcrumb } from "antd";

<Breadcrumb separator=">">
  <Breadcrumb.Item><a href="">一级菜单</a></Breadcrumb.Item>
  <Breadcrumb.Item><a href="">二级菜单</a></Breadcrumb.Item>
  <Breadcrumb.Item>三级菜单</Breadcrumb.Item>
</Breadcrumb>
                    `}</CodeStatus>
                  </div>

              </div>

               

              {/* 参数说明 */}
              <h2>组件属性</h2>
              <Doc dataList={propsConfig} />
              <h2>Breadcrumb.Item属性</h2>
              <Doc dataList={breadcrumbItemConfig} />
           </div>
        );
    }
}
