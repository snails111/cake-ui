import React, { Component } from "react";
import CodeStatus from "../../../components/codeStatus.jsx";
import Doc from "../../../components/doc.jsx";
import { Line,StackedArea } from '@antv/g2plot';
import moment from "moment"

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


const data=[
    { year: '1991-03-12', value: 3 },
    { year: '1992-01-02', value: 4 },
    { year: '1993-06-14', value: 3.5 },
    { year: '1994-07-11', value: 5 },
    { year: '1995-01-09', value: 4.9 },
    { year: '1996-12-21', value: 6 },
    { year: '1997-06-29', value: 7 },
    { year: '1998-09-12', value: 9 },
    { year: '1999-11-11', value: 13 },
]
const data2=[
    {value: 0,date: "01:00:00",type:"live"},
    {value: 40,date: "01:30:00",type:"live"},
    {value: 59,date: "02:00:00",type:"live"},
    {value: 88,date: "02:30:00",type:"live"},
    {value: 103,date: "03:00:00",type:"live"},
    {value: 10,date: "01:00:00",type:"playback"},
    {value: 23,date: "01:30:00",type:"playback"},
    {value: 45,date: "02:00:00",type:"playback"},
    {value: 99,date: "02:30:00",type:"playback"},
    {value: 136,date: "03:00:00",type:"playback"},
]
export default class LinechartsDemo extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
        //折线图实例
        this.line1=null 
        this.line2=null
        this.line3=null
        this.line4=null

        this.config1={
            title: {
            visible: true,
            text: '折线图1',
            },
            description: {
                visible: true,
                text: '基础折线图',
            },
            meta: { 
                year: {
                    alias:'年份'
                },
                value: {
                    alias:'增值',
                }
            },
            padding: 'auto',
            forceFit: true,//图表是否自适应容器宽高
            data:data,
            xField: 'year',
            yField: 'value',
        };

        this.config2={
            title: {
                visible: true,
                text: '折线图2',
                position: 'center',
                style:{
                    fontSize: 14,
                }
            },
            smooth: true, //平滑曲线
            padding: [20, 100, 100, 80],
            forceFit: true,//图表是否自适应容器宽高
            lineSize:2,//折线宽度（默认2px）
            lineStyle:{stroke:"#13CE66"},//折线样式
            point: {visible: true},//折线点
            data:data, //至少必须传入一个模板示例
            meta: { 
                year: {
                    alias:'年份'
                },
                value: {
                    alias:'增值',
                    formatter:(v)=>{return `${v} K`}
                }
            },
            tooltip:{
                domStyles:{
                    'g2-tooltip': {
                        backgroundColor:"#1F2D3D",
                        color:"#fff",
                    },
                }
            },
            xField: 'year',
            yField: 'value',
            xAxis: {
                visible:true,
                tickCount: 6,//x坐标轴刻度数量
                label:{
                    formatter:(v)=>{return moment(v).format("YYYY-MM")}
                },
                tickLine:{visible:false},
                line:{visible:true,style:{stroke:"#C0CCDA"}},
            }, 
            yAxis: {
                tickCount: 6,//y坐标轴刻度数量
                line:{visible:true,style:{stroke:"#C0CCDA"}},
                grid:{visible:false},  
            }, 
        };

        this.config3={
            title: {
            visible: true,
            text: '折线图3',
            },
            description: {
                visible: true,
                text: '多折线图',
            },
            padding: 'auto',
            forceFit: true,//图表是否自适应容器宽高
            color: ['#13CE66', '#20A0FF'],//多折线样式
            seriesField: 'type',
            data:data2, //至少必须传入一个模板示例
            xField: 'date',
            yField: 'value',
            xAxis: {
                visible:true,
                tickCount: 6,//x坐标轴刻度数量
                tickLine:{visible:false},
                line:{visible:true,style:{stroke:"#C0CCDA"}},
            }, 
            yAxis: {
                tickCount: 6,//y坐标轴刻度数量
                line:{visible:true,style:{stroke:"#C0CCDA"}},
                grid:{visible:true}, 
            }, 
        };

        this.config4={
            title: {
                visible: true,
                text: '堆叠图3',
                position: 'center',
                style:{
                    fontSize: 14,
                }
            },
            smooth: true, //平滑曲线
            forceFit: true,//图表是否自适应容器宽高 (受padding影响)
            color: ['#60d7a7', '#fab36f', '#d96d6f'],//多折线样式
            point: { //折线点
                visible: true,
                shape: 'diamond',
                size: 5, //点的大小
            },
            data:data2,  //至少必须传入一个模板示例
            tooltip:{
                domStyles:{
                    'g2-tooltip': {
                        backgroundColor:"#1F2D3D",
                        color:"#fff",
                    },
                }
            },
            seriesField: 'type',//分类项
            xField: 'date',
            yField: 'value',
            xAxis: {
                visible:true,
                tickCount: 6,//x坐标轴刻度数量
                tickLine:{visible:false},
                line:{visible:true,style:{stroke:"#C0CCDA"}},
            }, 
            yAxis: {
                tickCount: 6,//y坐标轴刻度数量
                line:{visible:true,style:{stroke:"#C0CCDA"}},
                grid:{visible:false}, 
            }, 
        };
    }
    componentDidMount=()=>{
        this.initLine1()
        this.initLine2()
        this.initLine3()
        this.initLine4()
    }

    initLine1=()=>{
        // 初始化折线图实例
        this.line1 = new Line(document.getElementById("line1"), this.config1);
        this.line1.render();
    }

    initLine2=()=>{
        // 初始化折线图实例
        this.line2 = new Line(document.getElementById("line2"), this.config2);
        this.line2.render();
    }

    initLine3=()=>{
        // 初始化折线图实例
        this.line3 = new Line(document.getElementById("line3"), this.config3);
        this.line3.render();
    }

    initLine4=()=>{
        // 初始化堆叠图实例
        this.line4 = new StackedArea(document.getElementById("line4"), this.config4);
        this.line4.render();
    }

    render() {
        

        return (
            <div>
                <h2>AntV折线图 示例</h2>

                <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap"}}>

                    {/* line1 */}
                    <div style={{width:"48%"}}>
                        <div id="line1"></div>

                        <CodeStatus>{`
import { Line } from '@antv/g2plot';

const config=${JSON.stringify(this.config1, null, 2)}

//折线图实例
this.line1=null 
// 初始化折线图实例
this.line1 = new Line(document.getElementById("line1"), config);
this.line1.render();

<div id="line1"></div>
                        `}</CodeStatus>
                    </div>


                    {/* line2 */}
                    <div style={{width:"48%"}}>
                        <div id="line2"></div>

                        <CodeStatus>{`
import { Line } from '@antv/g2plot';

const config=${JSON.stringify(this.config2, null, 2)}

//折线图实例
this.line2=null 
// 初始化折线图实例
this.line2 = new Line(document.getElementById("line2"), config);
this.line2.render();

<div id="line2"></div>
                        `}</CodeStatus>
                    </div>

                    {/* line3 */}
                    <div style={{width:"48%"}}>
                        <div id="line3"></div>

                        <CodeStatus>{`
import { Line } from '@antv/g2plot';

const config=${JSON.stringify(this.config3, null, 2)}

//折线图实例
this.line3=null 
// 初始化折线图实例
this.line3 = new Line(document.getElementById("line3"), config);
this.line3.render();

<div id="line3"></div>
                        `}</CodeStatus>
                    </div>


                    {/* line4 */}
                    <div style={{width:"48%"}}>
                        <div id="line4"></div>

                        <CodeStatus>{`
import { StackedArea } from '@antv/g2plot';

const config=${JSON.stringify(this.config4, null, 2)}

//堆叠图实例
this.line4=null 
// 初始化堆叠图实例
this.line4 = new StackedArea(document.getElementById("line4"), config);
this.line4.render();

<div id="line4"></div>
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
