import React, { Component } from 'react';
import { TransferSelectTag } from "cake-ui"; // eslint-disable-line
import CodeStatus from "../../../components/codeStatus.jsx"
import CodeLight from "../../../components/codeLight.jsx" 
import Doc from "../../../components/doc.jsx";

var  codeString = `

constructor(props, context) {
        super(props, context);
        this.state = {
            sourceData:[]
        }

    }
    componentDidMount(){
        this.queryData();
    }
    /* 请求初始数据 并对数据做处理 */
    queryData = () => {
        const sourceData = [];
        /* 这个数据只是模拟数据  具体的要自己去请求 */
        for(let i=0; i<100; i++){
            sourceData.push({label:"张三" + i,key:i})
        }
        this.setState({
            sourceData
        })
    }
    onChange = (nextTargetKeys, direction, moveKeys) => {
        // eslint-disable-next-line no-console
        console.log(nextTargetKeys, direction, moveKeys)
    }
    render() {
        const { isCodeCollpase } = this.state;
        return (
           <div>
               <h1>以下是穿梭过滤框组件类型二示例</h1>
               <div>
                   <TransferSelectTag dataSource={this.state.sourceData} onChange={this.onChange} />
               </div>
               {this.controlCode()}
               <CodeLight isCodeCollpase={isCodeCollpase} codeString={codeString}/>
                {/* 参数说明 */}
                <h2>组件属性</h2>
                <Doc col={columns2} data={data2} />
           </div>
        );
    }

`;


//组件属性配置
const columns2  = [
    {
      title: "参数",
      dataIndex: "para",
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
const data2 = [
    {
        key: "0",
        para: "className",
        statement: "自定义类",
        type: "String",
        defaultVal: ""
      },
    {
      key: "1",
      para: "dataSource",
      statement: "左侧源列表的数据,数据格式：{key：每条数据独有的id,label：展示在列表中的名称,description：鼠标移入时显示的描述，可不传}",
      type: "Array",
      defaultVal: "[]"
    },
    {
      key: "2",
      para: "showSelect",
      statement: "是否显示复选框",
      type: "Boolean",
      defaultVal: "true"
    },
    {
      key: "3",
      para: "titles",
      statement: "两边列表的标题",
      type: "Array",
      defaultVal: "['源列表', '目的列表']"
    },
    {
      key: "4",
      para: "targetKeys",
      statement: "初始右边目的列表显示的数据，数组里面只装数据的key(例['1','2','3'])",
      type: "Array",
      defaultVal: "[]"
    },
    {
      key: "5",
      para: "disabled",
      statement: "是否禁用",
      type: "Boolean",
      defaultVal: "false"
    },
    {
      key: "6",
      para: "showSearch",
      statement: "是否显示搜索框",
      type: "Boolean",
      defaultVal: "true"
    },
    {
      key: "7",
      para: "onChange",
      statement: "选项在两栏之间转移时的回调函数",
      type: "(targetKeys, direction, moveKeys): void",
      defaultVal: ""
    },
    {
      key: "8",
      para: "onScroll",
      statement: "选项列表滚动时的回调函数",
      type: "(direction, event): void",
      defaultVal: ""
    },
    {
      key: "9",
      para: "locale",
      statement: "各种语言",
      type: "Object",
      defaultVal: `{
        itemUnit: "条",
        itemsUnit: "条",
        notFoundContent: "列表为空",
        searchPlaceholder: "请输入搜索内容"
    }`
    },
    {
      key: "9",
      para: "listStyle",
      statement: "两个穿梭框的自定义样式",
      type: "Object",
      defaultVal: "{}"
    },
];

class TransferSelectTagDemo extends CodeStatus {
    constructor(props, context) {
        super(props, context);
        this.state = {
            sourceData:[]
        }

    }
    componentDidMount(){
        this.queryData();
    }
    /* 请求初始数据 并对数据做处理 */
    queryData = () => {
        const sourceData = [];
        /* 这个数据只是模拟数据  具体的要自己去请求 */
        for(let i=0; i<100; i++){
            sourceData.push({label:`张三${i}`,key:i})
        }
        this.setState({
            sourceData
        })
    }
    onChange = (nextTargetKeys, direction, moveKeys) => {
        // eslint-disable-next-line no-console
        console.log(nextTargetKeys, direction, moveKeys)
    }
    render() {
        /* const sourceData = [];
        for(let i=0; i<20; i++){
            sourceData.push({label:`张三自`,value:i})
        } */
        const { isCodeCollpase } = this.state;
        return (
           <div>
               <h1>以下是穿梭过滤框组件类型二示例</h1>
               <div>
                   <TransferSelectTag dataSource={this.state.sourceData} onChange={this.onChange} />
               </div>
               {this.controlCode()}
               <CodeLight isCodeCollpase={isCodeCollpase} codeString={codeString}/>
                {/* 参数说明 */}
                <h2>组件属性</h2>
                <Doc col={columns2} data={data2} />
           </div>
        );
    }

}

export default TransferSelectTagDemo;