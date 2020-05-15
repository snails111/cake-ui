import React, { Component } from "react";
import CodeStatus from "../../../components/codeStatus.jsx";
import Doc from "../../../components/doc.jsx";
import { Column } from '@antv/g2plot';

/* 组件属性 */
const propsConfig = [
    {
        key: "1",
        param: "type",
        explain: "图表类型",
        type: "'pie' | 'line' | 'bar'",
        defaultValue: "line"
    },
    {
        key: "2",
        param: "option",
        explain: "所有参数,详见下方文档",
        type: "Object",
        defaultValue: "{}"
    }
];

const data = [
    {
      type: '家具家电',
      sales: 38,
    },
    {
      type: '粮油副食',
      sales: 52,
    },
    {
      type: '生鲜水果',
      sales: 61,
    },
    {
      type: '美容洗护',
      sales: 145,
    },
    {
      type: '母婴用品',
      sales: 48,
    },
    {
      type: '进口食品',
      sales: 38,
    },
    {
      type: '食品饮料',
      sales: 38,
    },
    {
      type: '家庭清洁',
      sales: 38,
    },
];
export default class BarchartsDemo extends Component{
    constructor(props) {
        super(props);
        this.state = {};
        //柱状图实例
        this.bar1=null 

        this.config1={
            title: {
                visible: true,
                text: '柱状图1',
            },
            forceFit: true,
            data,
            padding: 'auto',
            data,
            xField: 'type',
            yField: 'sales',
            meta: {
                type: {
                    alias: '类别',
                },
                sales: {
                    alias: '销售额(万)',
                },
            },
        }
    }
    componentDidMount=()=>{
        this.bar1 = new Column(document.getElementById('bar1'),this.config1)
        this.bar1.render();
    }

    render() {

        return (
            <div>
                <h2>AntV柱状图 示例</h2>
                <div id="bar1"></div>
                
                <CodeStatus>{`
import { Column } from '@antv/g2plot';

const config=${JSON.stringify(this.config1, null, 2)}

//柱状图实例
this.bar1=null 
// 初始化柱状图实例
this.bar1 = new Line(document.getElementById("bar1"), config);
this.bar1.render();

<div id="bar1"></div>
                `}</CodeStatus>


                {/* 参数说明 */}
                <h2>组件属性</h2>
                <Doc dataList={propsConfig} />
             
            </div>
        );
    }
}
