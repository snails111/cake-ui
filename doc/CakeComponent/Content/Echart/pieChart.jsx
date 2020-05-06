import React from "react";
import { MyRecharts } from "cake-ui";
import CodeStatus from "../../../components/codeStatus.jsx";
import CodeLight from "../../../components/codeLight.jsx";
import Doc from "../../../components/doc.jsx";
var codeString = `

const pieOption = {
    // width: 700, //宽
    // height: 500, //高
    // legend: true, //图例
    //colors: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "blue", "red"], //扇形颜色
    pies: [
        {
            //name: "name",
            value: "pv",
            // cx:350, //圆心X轴
            // cy:250, //圆心Y轴
            // innerRadius:0,      //内径
            // outerRadius:200,    //外径
            // onClick: e => {
            //     console.log(e);
            // },
            // animationDuration: 1000 //动画持续时间
        }
    ],
    data: [
        //传入数据
        {
            name: "18年08月",
            uv: 3500,
            pv: 2400,
            amt: 2400
        },
        {
            name: "18年09月",
            uv: 4200,
            pv: 1398,
            amt: 2210
        },
        {
            name: "18年10月",
            uv: 3800,
            pv: 9800,
            amt: 2290
        },
        {
            name: "18年11月",
            uv: 3800,
            pv: 3908,
            amt: 2000
        },
        {
            name: "18年12月",
            uv: 5000,
            pv: 4800,
            amt: 2181
        },
        {
            name: "19年01月",
            uv: 5000,
            pv: 3800,
            amt: 2500
        }
    ]
};

export default class MyRechartsDemo extends React.Component {
    render() {
        return (
            <div>
                <MyRecharts option={pieOption} type="line" />
            </div>
        );
    }
}

`;

const pieOption = {
    // width: 700, //宽
    // height: 500, //高
    // legend: true, //图例
    //colors: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "blue", "red"], //扇形颜色

    pies: [
        {
            //name: "name",
            value: "pv"
            // cx:350, //圆心X轴
            // cy:250, //圆心Y轴
            // innerRadius:0,      //内径
            // outerRadius:200,    //外径
            // onClick: e => {
            //     console.log(e);
            // },
            //labelLine:true,
            // animationDuration: 1000 //动画持续时间
        }
    ],
    data: [
        //传入数据
        {
            name: "18年08月",
            uv: 3500,
            pv: 2400,
            amt: 2400
        },
        {
            name: "18年09月",
            uv: 4200,
            pv: 1398,
            amt: 2210
        },
        {
            name: "18年10月",
            uv: 3800,
            pv: 9800,
            amt: 2290
        },
        {
            name: "18年11月",
            uv: 3800,
            pv: 3908,
            amt: 2000
        },
        {
            name: "18年12月",
            uv: 5000,
            pv: 4800,
            amt: 2181
        },
        {
            name: "19年01月",
            uv: 5000,
            pv: 3800,
            amt: 2500
        }
    ]
};

/* 文档配置 */
const columns = [
    {
        title: "参数",
        dataIndex: "para"
    },
    {
        title: "说明",
        dataIndex: "statement"
    },
    {
        title: "类型",
        dataIndex: "type"
    },
    {
        title: "默认值",
        dataIndex: "defaultVal"
    }
];
const data = [
    {
        key: "1",
        para: "type",
        statement: "图表类型",
        type: "'pie' | 'line' | 'bar'",
        defaultVal: "line"
    },
    {
        key: "2",
        para: "option",
        statement: "所有参数,详见下方文档",
        type: "Object",
        defaultVal: "{}"
    }
];

const data2 = [
    {
        key: "0",
        para: "option.data",
        statement: "数据",
        type: "Array",
        defaultVal: ""
    },
    {
        key: "1",
        para: "option.width",
        statement: "宽",
        type: "Number",
        defaultVal: "400"
    },
    {
        key: "2",
        para: "option.height",
        statement: "高",
        type: "Number",
        defaultVal: "300"
    },
    {
        key: "3",
        para: "option.margin",
        statement: "图表四周的留白大小，支持传入部分值（如： { top: 5 }）",
        type: "Object",
        defaultVal: "{ top: 5, right: 5, bottom: 5, left: 5 }"
    },
    {
        key: "4",
        para: "option.legend",
        statement: (
            <span>
                图例，传入对象时参数见
                {
                    <a
                        target="_blank"
                        href="http://recharts.org/zh-CN/api/Legend"
                    >{`<Legend/>`}</a>
                }
                组件
            </span>
        ),
        type: "Boolean | Object",
        defaultVal: "false"
    },
    {
        key: "5",
        para: "option.colors",
        statement: "饼状图背景色，详见上方示例代码",
        type: "Array",
        defaultVal: ""
    },
    {
        key: "6",
        para: "option.pies",
        statement: "饼状图参数，详见下方文档",
        type: "Array",
        defaultVal: ""
    },
    {
        key: "7",
        para: "option.toolTip",
        statement: "文字提示",
        type: "Boolean",
        defaultVal: "true"
    }
];
const data3 = [
    {
        key: "1",
        para: "name",
        statement: "'name' 属性对应的 key ",
        type: "String",
        defaultVal: "name"
    },
    {
        key: "2",
        para: "value",
        statement: "'value' 属性对应的 key",
        type: "String",
        defaultVal: ""
    },
    {
        key: "3",
        para: "cx",
        statement:
            "圆心的x坐标，如果值为百分比，会根据图表的宽度来计算最后的值",
        type: "Percentage | Number",
        defaultVal: "50%"
    },
    {
        key: "4",
        para: "cy",
        statement:
            "圆心的y坐标，如果值为百分比，会根据图表的高度来计算最后的值。",
        type: "Percentage | Number",
        defaultVal: "50%"
    },
    {
        key: "5",
        para: "innerRadius",
        statement:
            "饼图的内径。如果值为百分比，我们首先会根据圆心的坐标、图表的宽度、图表的高度计算一个最大半径，然后根据这个最大半径来计算真实的半径",
        type: "Percentage | Number",
        defaultVal: "0"
    },
    {
        key: "6",
        para: "outerRadius",
        statement:
            "饼图的外径。如果值为百分比，我们首先会根据圆心的坐标、图表的宽度、图表的高度计算一个最大半径，然后根据这个最大半径来计算真实的半径。",
        type: "Percentage | Number",
        defaultVal: "80%"
    },
    {
        key: "7",
        para: "onClick",
        statement: "楔子 click 事件的回调函数。",
        type: "Function",
        defaultVal: ""
    },
    {
        key: "8",
        para: "label",
        statement:
            "图形上的文本标签。当值为 false ，不展示文本标签。当值为 true，会根据 Bar 的属性配置来展示文本标签。当值为一个对象的时候，会把这个对象解析为 文本标签 的属性，对象参数参考下方文档，来覆盖默认属性。当值是一个 React Element ，会克隆这个 React Element 来渲染“文本标签”。当值是一个 函数 时，会调用这个函数去渲染自定义的“文本标签”。",
        type: "Boolean | Object | ReactElement | Function",
        defaultVal: "true"
    },
    {
        key: "8",
        para: "labelLine",
        statement:
            "文本标签与楔子的连线。当值为 false ，不展示连线。当值为 true，会根据 Bar 的属性配置来展示连线。当值为一个对象的时候，会把这个对象解析为 连线 的属性，来覆盖默认属性。当值是一个 React Element ，会克隆这个 React Element 来渲染“连线”。当值是一个 函数 时，会调用这个函数去渲染自定义的“连线”。",
        type: "Boolean | Object | ReactElement | Function",
        defaultVal: "false"
    }
];

const data4 = [
    {
        key: "1",
        para: "label.position",
        statement: "文本标签的位置",
        type: "'out' | 'inside'",
        defaultVal: "inside"
    },
    {
        key: "2",
        para: "label.color",
        statement: "文本位置为'inside'时，文本的字体颜色",
        type: "String",
        defaultVal: "#fff"
    },
    {
        key: "3",
        para: "label.fontSize",
        statement: "文本位置为'inside'时，文本的字体大小",
        type: "String",
        defaultVal: "14"
    }
];
export default class MyRechartsDemo extends CodeStatus {
    render() {
        const { isCodeCollpase } = this.state;
        return (
            <div>
                <MyRecharts option={pieOption} type="pie" />
                {this.controlCode()}
                <CodeLight
                    isCodeCollpase={isCodeCollpase}
                    codeString={codeString}
                />
                <h3>组件属性</h3>
                <Doc col={columns} data={data} />
                <h3>option</h3>
                <Doc col={columns} data={data2} />
                <h3>option.pies</h3>
                <h2>
                    数组，可以包含多个对象，以下是单个对象的参数，更多参数请参考
                    <a
                        target="_blank"
                        href="http://recharts.org/zh-CN/api/Pie"
                    >{`<Pie/>`}</a>
                    组件
                </h2>
                <Doc col={columns} data={data3} />
                <h3>label</h3>
                <Doc col={columns} data={data4} />
            </div>
        );
    }
}
