import React, { Component } from 'react';
import CodeStatus from "../../../components/codeStatus.jsx"
import Doc from "../../../components/doc.jsx";
import { TransferTag } from "cake-ui/src";

//组件属性
const propsConfig = [
    {
      key: "targetTitle",
      param: "targetTitle",
      explain: "已选中栏的title",
      type: "string",
      defaultValue: "已选中"
    },
    {
      key: "sourceTitle",
      param: "sourceTitle",
      explain: "未选中栏的title",
      type: "string",
      defaultValue: "未选中"
    },
    {
      key: "value",
      param: "value",
      explain: "已选中栏的数据",
      type: "array",
      defaultValue: "[]"
    },
    {
      key: "sourceData",
      param: "sourceData",
      explain: "未选中栏的数据",
      type: "array",
      defaultValue: "[]"
    },
    {
      key: "delPermission",
      param: "delPermission",
      explain: "判断是否有删除已选中的数据的权限（delArr：删除数组，cb（isCan）：执行回调函数）",
      type: "function",
      defaultValue: "(delArr, cb)=>{ cb(true) }"
    },
    {
      key: "savePermission",
      param: "savePermission",
      explain: "判断是否有保存未选中的数据的权限（saveArr：选中数组，cb（isCan）：执行回调函数）",
      type: "function",
      defaultValue: "(saveArr, cb)=>{ cb(true) }"
    },
    {
      key: "onChange",
      param: "onChange",
      explain: "点击触发的事件",
      type: "function",
      defaultValue: ""
    },
    {
      key: "targetFilter",
      param: "targetFilter",
      explain: "已选中栏是否出现过滤搜索栏",
      type: "boolean",
      defaultValue: "true"
    },
    {
      key: "sourceFilter",
      param: "sourceFilter",
      explain: "未选中栏是否出现过滤搜索栏",
      type: "boolean",
      defaultValue: "true"
    },
    {
      key: "className",
      param: "className",
      explain: "添加额外class",
      type: "string",
      defaultValue: ""
    },
    {
      key: "style",
      param: "style",
      explain: "添加其他的样式",
      type: "object",
      defaultValue: ""
    },
];

class TransferTagDemo extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            sourceData:[],
        }
    }

    componentDidMount(){
        this.queryData();
    }
    /* 请求初始数据 并对数据做处理 */
    queryData = () => {
        const sourceData = [];
        /* 这个数据只是模拟数据  具体的要自己去请求 */
        for(let i=0; i<10; i++){
            sourceData.push({label:`张三`,value:i})
        }
        this.setState({
            sourceData
        })
    }
    delPermission = (arr,callback) => {
        const flag = true;
        new Promise((resolve) =>{
            resolve();
        } ).then(()=>{
            callback(flag)
        })
        return flag;
    }

    render() {
        return (
           <div>
               <h1>定制穿梭过滤框 示例</h1>
               <div style={{width:640,border:"1px dashed #ddd",padding:"20px"}} >
                  <TransferTag 
                    value={[{value:"1",label:"测试"}]} 
                    sourceData={this.state.sourceData} 
                    delPermission={(arr,callback)=>{this.delPermission(arr,callback)}}  
                  />
               </div>
               
               
               <CodeStatus>{` 
import { TransferTag } from "cake-ui"

const sourceData=${JSON.stringify(this.state.sourceData,null,2)}

<TransferTag 
  value={[{value:"1",label:"测试"}]} 
  sourceData={this.state.sourceData} 
  delPermission={(arr,callback)=>{this.delPermission(arr,callback)}}  
/>
            `}</CodeStatus>

                {/* 参数说明 */}
                <h2>组件属性</h2>
                <Doc dataList={propsConfig} />
           </div>
        )
    }

}

export default TransferTagDemo;