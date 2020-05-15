import React, { Component } from 'react';
import CodeStatus from "../../../components/codeStatus.jsx"
import Doc from "../../../components/doc.jsx";
import { Transfer } from "cake-ui/src";

//组件属性
const propsConfig = [
    {
        key: "0",
        param: "className",
        explain: "自定义类",
        type: "String",
        defaultValue: ""
    },
    {
      key: "1",
      param: "dataSource",
      explain: "左侧源列表的数据,数据格式：{key：每条数据独有的id,label：展示在列表中的名称,description：鼠标移入时显示的描述，可不传}",
      type: "Array",
      defaultValue: "[]"
    },
    {
      key: "2",
      param: "showSelect",
      explain: "是否显示复选框",
      type: "Boolean",
      defaultValue: "true"
    },
    {
      key: "3",
      param: "titles",
      explain: "两边列表的标题",
      type: "Array",
      defaultValue: "['源列表', '目的列表']"
    },
    {
      key: "4",
      param: "targetKeys",
      explain: "初始右边目的列表显示的数据，数组里面只装数据的key(例['1','2','3'])",
      type: "Array",
      defaultValue: "[]"
    },
    {
      key: "5",
      param: "disabled",
      explain: "是否禁用",
      type: "Boolean",
      defaultValue: "false"
    },
    {
      key: "6",
      param: "showSearch",
      explain: "是否显示搜索框",
      type: "Boolean",
      defaultValue: "true"
    },
    {
      key: "7",
      param: "onChange",
      explain: "选项在两栏之间转移时的回调函数",
      type: "(targetKeys, direction, moveKeys): void",
      defaultValue: ""
    },
    {
      key: "8",
      param: "onScroll",
      explain: "选项列表滚动时的回调函数",
      type: "(direction, event): void",
      defaultValue: ""
    },
    {
      key: "9",
      param: "locale",
      explain: "各种语言",
      type: "Object",
      defaultValue: `{
        itemUnit: "条",
        itemsUnit: "条",
        notFoundContent: "列表为空",
        searchPlaceholder: "请输入搜索内容"
    }`
    },
    {
      key: "9",
      param: "listStyle",
      explain: "两个穿梭框的自定义样式",
      type: "Object",
      defaultValue: "{}"
    },
];

class TransferDemo extends Component {
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

    render() {
      let dataSourceList=[]
      for(let i=1; i<=10; i++){
        if(i===3){
          dataSourceList.push({label:`张三${i}`,key:i, disabled:true})
        }else{
          dataSourceList.push({label:`张三${i}`,key:i})
        }
      }

      return (
           <div>
              <h2>穿梭过滤框 示例</h2>


              <div style={{display:"flex",justifyContent:"space-between"}}>

                  {/* 简单版 */}
                  <div style={{width:"48%"}}>
                    <Transfer 
                      dataSource={dataSourceList} 
                      onChange={(nextTargetKeys, direction, moveKeys) => {
                        console.log(nextTargetKeys, direction, moveKeys)
                      }} 
                    />

                    <CodeStatus>{`
import { Transfer } from "cake-ui"

const dataSourceList=${JSON.stringify(dataSourceList,null,2)}

<Transfer 
  dataSource={dataSourceList} 
  onChange={(nextTargetKeys, direction, moveKeys) => null}
/>
                    `}</CodeStatus>
                  </div>


                  {/* 复杂版 */}
                  <div style={{width:"48%"}}>
                    <Transfer 
                      showSearch={true}
                      dataSource={dataSourceList} 
                      onChange={(nextTargetKeys, direction, moveKeys) => {
                        console.log(nextTargetKeys, direction, moveKeys)
                      }} 
                    />

                    <CodeStatus>{`
import { Transfer } from "cake-ui"

const dataSourceList=${JSON.stringify(dataSourceList,null,2)}

<Transfer 
  showSearch={true}
  dataSource={dataSourceList} 
  onChange={(nextTargetKeys, direction, moveKeys) => null}
/>
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

export default TransferDemo;