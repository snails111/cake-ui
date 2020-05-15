import React,{Component} from "react"
import { Link } from "react-router-dom"
import {
    Layout, Menu,
} from 'antd';
import { TagOutlined,TableOutlined,PieChartOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
const { Sider } = Layout;


const menus =[
    {
        url:"searchForm",
        text:"SearchForm"
    },
    {
        url:"tableData",
        text:"TableData"
    },
    {
        url:"form",
        text:"Form"
    },
    {
        url:"popForm",
        text:"PopForm"
    },
    {
        url:"draggableModal",
        text:"DraggableModal"
    },
    {
        url:"draggablePopForm",
        text:"DraggablePopForm"
    },
    {
        url:"checkTagGroup",
        text:"CheckTagGroup"
    },
    {
        url:"editor",
        text:"WangEditor"
    },
    {
        url:"tree",
        text:"Tree"
    },
    {
        url:"slider",
        text:"Slider"
    },
    {
        url:"steps",
        text:"Steps"
    },
    {
        url:"button",
        text:"Button"
    },
    {
        url:"badge",
        text:"Badge"
    },
    {
        url:"radioAndCheckbox",
        text:"RadioAndCheckbox"
    },
    {
        url:"switch",
        text:"Switch"
    },
    {
        url:"inputAndSelect",
        text:"InputAndSelect"
    },
    {
        url:"datePicker",
        text:"DatePicker"
    },
    {
        url:"upload",
        text:"Upload"
    },
    {
        url:"breadcrumb",
        text:"Breadcrumb"
    },
    {
        url:"rate",
        text:"Rate"
    },
    {
        url:"transfer",
        text:"Transfer"
    },
    {
        url:"transferTag",
        text:"TransferTag"
    },
    {
        url:"photoView",
        text:"PhotoView"
    },
];
const echartsMenu = [
    {
        url:"barChart",
        text:"柱状图"
    },
    {
        url:"lineChart",
        text:"折线图"
    },
    {
        url:"pieChart",
        text:"饼状图"
    },
    {
        url:"ringChart",
        text:"环状图"
    },
];
export default class AsideMenu extends React.Component{
    render(){
        const {match} = this.props;
        return   <Sider style={{ background:"#fff", overflow: 'hidden auto'}}>
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
                        <SubMenu key="图表" title={<span><PieChartOutlined />AntV图表</span>}>
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