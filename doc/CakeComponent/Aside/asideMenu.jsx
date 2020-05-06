import React from "react"
import { Link } from "react-router-dom"
import {
    Layout, Menu,
} from 'antd';
import { TagOutlined,TableOutlined,PieChartOutlined } from '@ant-design/icons';
  
const { SubMenu } = Menu;
const { Sider } = Layout;


const menus =[
    {
        url:"form",
        text:"Form"
    },
    {
        url:"popForm",
        text:"PopForm"
    },
    {
        url:"searchForm",
        text:"SearchForm"
    },
    {
        url:"table",
        text:"TableData"
    },
    {
        url:"tagGroup",
        text:"CheckTagGroup"
    },
    {
        url:"draggle",
        text:"DraggableModal"
    },
    {
        url:"editor",
        text:"WangEditor"
    },
    {
        url:"transferTag",
        text:"TransferTag"
    },
    {
        url:"transferSelectTag",
        text:"TransferSelectTag"
    },
    {
        url:"photoView",
        text:"PhotoView"
    },
   
];
const echartsMenu = [
    {
        url:"pieChart",
        text:"饼状图"
    },
    {
        url:"barChart",
        text:"柱状图"
    },
    {
        url:"lineChart",
        text:"条形图"
    },
    {
        url:"ringChart",
        text:"环状图"
    },
];
export default class AsideMenu extends React.Component{
    render(){
        const {match} = this.props;
        return   <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['0']}
                        defaultOpenKeys={['sub0']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <SubMenu key="开发组件" title={<span><TagOutlined />开发组件</span>}>
                            <Menu.Item key="注意事项" ><Link to={`${match.url}/payAttention`}>注意事项</Link></Menu.Item>
                        </SubMenu> 
                        <SubMenu key="范例" title={<span><TableOutlined />范例</span>}>
                            {
                                menus.map((item, index)=>{
                                    return <Menu.Item key={item.text} ><Link to={`${match.url}/${item.url}`}>{item.text}</Link></Menu.Item>
                                })
                            }
                        </SubMenu> 
                        <SubMenu key="图表" title={<span><PieChartOutlined />图表</span>}>
                            {
                                echartsMenu.map((item, index)=>{
                                    return <Menu.Item key={item.text} ><Link to={`${match.url}/${item.url}`}>{item.text}</Link></Menu.Item>
                                })
                            }
                        </SubMenu> 
                    </Menu>
                </Sider>
    }
}