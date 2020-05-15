import React, { Component } from 'react';
import CodeStatus from "../../../components/codeStatus.jsx"
import Doc from "../../../components/doc.jsx";
import { TransferTag } from "cake-ui/src";



//组件属性
const propsConfig = [
    {
      key: "1",
      param: "targetTitle",
      explain: "已选中栏的title",
      type: "string",
      defaultValue: "已选中"
    },
    {
      key: "2",
      param: "sourceTitle",
      explain: "未选中栏的title",
      type: "string",
      defaultValue: "未选中"
    },
    {
      key: "3",
      param: "sourceData",
      explain: "未选中栏的数据",
      type: "object",
      defaultValue: "[]"
    },
    {
      key: "4",
      param: "onChange",
      explain: "点击触发的事件",
      type: "function",
      defaultValue: ""
    },
    {
      key: "5",
      param: "targetFilter",
      explain: "已选中栏是否出现过滤搜索栏",
      type: "boolean",
      defaultValue: "true"
    },
    {
      key: "6",
      param: "sourceFilter",
      explain: "未选中栏是否出现过滤搜索栏",
      type: "boolean",
      defaultValue: "true"
    },
    {
      key: "7",
      param: "style",
      explain: "添加其他的样式",
      type: "object",
      defaultValue: ""
    },
    {
      key: "8",
      param: "className",
      explain: "添加额外class",
      type: "string",
      defaultValue: ""
    },
    {
      key: "9",
      param: "value",
      explain: "已选中栏的数据",
      type: "object",
      defaultValue: "[]"
    },
    {
      key: "9",
      param: "delPermission",
      explain: "删除已选中栏中数据",
      type: "function",
      defaultValue: "[]"
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