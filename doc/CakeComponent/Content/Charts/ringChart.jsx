import React, { Component } from "react";
import CodeStatus from "../../../components/codeStatus.jsx"
import Doc from "../../../components/doc.jsx";
import { Donut } from '@antv/g2plot';

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
      type: '分类一',
      value: 65,
    },
    {
      type: '分类二',
      value: 43,
    },
    {
      type: '分类三',
      value: 18,
    },
];
export default class RingchartsTest extends Component{
    constructor(props) {
        super(props);
        this.state = {};
        //环图实例
        this.ring1=null 

        this.config1={
            title: {
                visible: true,
                text: '环图',
            },
            forceFit: true,
            radius: 0.8,
            padding: 'auto',
            data,
            color: ['#7190FE','#9AACFF','#A4B6FF', '#B6C5FE'],
            angleField: 'value',
            colorField: 'type',
            statistic: {
              visible: true,
            },
            label: {
                visible: true,
                type: 'spider',//拉线的label
            },
            legend: {
              visible: true,
              position: 'top-center',
            },
        }
    }
    componentDidMount=()=>{
        this.ring1 = new Donut(document.getElementById('ring1'),this.config1)
        this.ring1.render();
    }

    render() {
       
        return (
            <div>
                <h2>AntV环图 示例</h2>
                <div id="ring1"></div>
                
                <CodeStatus>{`
import { Donut } from '@antv/g2plot';

const config=${JSON.stringify(this.config1, null, 2)}

//环图实例
this.ring1=null 
// 初始化环图实例
this.ring1 = new Donut(document.getElementById("ring1"), config);
this.ring1.render();

<div id="ring1"></div>
                `}</CodeStatus>

                {/* 参数说明 */}
                <h2>组件属性</h2>
                <Doc dataList={propsConfig} />
            </div>
        );
    }
}
