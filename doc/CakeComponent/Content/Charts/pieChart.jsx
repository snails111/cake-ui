import React, { Component } from "react";
import CodeStatus from "../../../components/codeStatus.jsx";
import Doc from "../../../components/doc.jsx";
import { Pie } from '@antv/g2plot';

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
      type: '类型一',
      value: 65,
    },
    {
      type: '类型二',
      value: 25,
    },
    {
      type: '类型三',
      value: 18,
    },
    {
      type: '其它',
      value: 5,
    },
];
export default class PiechartsDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        //饼图实例
        this.pie1=null 

        this.config1={
            title: {
              visible: true,
              text: '饼图',
            },
            description: {
              visible: true,
              text:
                '当把饼图label的类型设置为spider时，标签分为两组，在图表两侧拉线对齐显示。一般来说，蜘蛛布局的label更不容易相互遮挡。',
            },
            forceFit: true,
            color: ['#7190FE','#9AACFF','#A4B6FF', '#B6C5FE'],
            radius: 0.8,
            data,
            angleField: 'value',
            colorField: 'type',
            label: {
              visible: true,
              type: 'spider',//拉线的label
            },
        }
    }
    componentDidMount=()=>{
        this.pie1 = new Pie(document.getElementById('pie1'),this.config1)
        this.pie1.render();
    }

    render() {

        return (
            <div>
                <h2>AntV饼图 示例</h2>
                <div id="pie1"></div>

                <CodeStatus>{`
import { Pie } from '@antv/g2plot';

const config=${JSON.stringify(this.config1, null, 2)}

//饼图实例
this.pie1=null 
// 初始化饼图实例
this.pie1 = new Line(document.getElementById("pie1"), config);
this.pie1.render();

<div id="pie1"></div>
                `}</CodeStatus>

                {/* 参数说明 */}
                <h2>组件属性</h2>
                <Doc dataList={propsConfig} />
            </div>
        );
    }
}
