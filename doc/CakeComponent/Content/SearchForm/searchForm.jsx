import React, { Component } from "react";
import { SearchForm } from "cake-ui";
import CodeStatus from "../../../components/codeStatus.jsx";
import CodeLight from "../../../components/codeLight.jsx";
import Doc from "../../../components/doc.jsx";
import moment from "moment"

var codeString = `
// 过滤表单配置示例
static searchConfig=[
    {
      name: "姓名",
      type: "text",
      keyName: "name",
      placeholder: "请输入姓名",
    },
    {
      name: "年龄",
      type: "number",
      keyName: "age",
      placeholder: "请输入年龄",
    },
    {
      name: "性别",
      type: "radio",
      keyName: "sex",
      defaultValue:1,
      options: [
        { value: 1, label: "男" },
        { value: 2, label: "女" },
      ]
    },
    {
      name: "爱好",
      type: "radioTag",
      keyName: "habby",
      defaultValue:1,
      options: [
        { value: 1, label: "唱歌" },
        { value: 2, label: "跳舞" },
        { value: 3, label: "画画" },
      ]
    },
    {
      name: "类型",
      type: "select",
      keyName: "type",
      defaultValue:1,
      options: [
        { value: "", label: "全部" },
        { value: "0", label: "000" }, // 注：value不可以为0，否则获取json时获取不到该值
        { value: 1, label: "111" },
        { value: 2, label: "222" },
        { value: 3, label: "333" }
      ]
    },
    {
      name: "天",
      keyName: "beginDate",
      type: "date",
      placeholder: "请选择时间",
      // disabledDate:(current)=>{
      //     return current && current < moment("2018-08-14", "YYYY-MM-DD")
      // }
    },
    {
      name: "周",
      keyName: "beginWeek",
      type: "date",
      dateType: "week",
      placeholder: "请选择时间"
    },
    {
      name: "月份",
      keyName: "beginMonth",
      type: "date",
      dateType: "month",
      placeholder: "请选择时间"
    },
    {
      name: "时间范围",
      type: "dateRange",
      keyName: "time",
      beginKeyName: "startTime",
      endKeyName: "endTime",
      colSpan: 8,
      itemInputStyle:{width:"100%"}
    },
    {
      name: "单个时间",
      type: "date",
      keyName: "time",
      format: "YYYY-MM-DD HH:mm:ss",
      showTime: {defaultValue: moment('00:00:00', 'HH:mm:ss'), format: 'HH:mm:ss'},
      colSpan: 4,
    },
    {
      name: "时间段",
      type: "dateRange",
      keyName: "time",
      beginKeyName: "startTime",
      endKeyName: "endTime",
      format: ["YYYY-MM-DD HH:mm:ss", "YYYY-MM-DD HH:mm:ss"],
      showTime: {defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')], format: 'HH:mm:ss'},
      colSpan: 8,
      mdColSpan: 10,
      smColSpan: 10,
      xsColSpan: 16,
      itemInputStyle:{width:"100%"}
    }
]

queryData=(json) =>{
    
}

render() {
    
    return (
        <div>
            <h2>以下是 SearchForm 示例：</h2>
            <SearchForm
              config={searchConfig}
              search={(params,isReset)=>this.queryData({...params,pageNo:1},isReset)} //必须把params传递下去，否则点击重置按钮时：赋了初值的过滤项会得到 ""
              // reset={this.resetSearch}
              // collapse={true}
              // buttonsColSpan={4}
              ref={ins=>this.searchFormIns=ins}
            />
         </div>
    )
}
`;




//组件属性配置
const columns  = [
    {
      title: "参数",
      dataIndex: "para",
    },
    {
      width:"50%",
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
      key: "config",
      para: "config",
      statement: "搜索表单的配置项",
      type: "array",
      defaultVal: "[详见下方config配置]"
    },
    {
      key: "search",
      para: "search",
      statement: "点击搜索时执行的方法",
      type: "function:(json)=>{}",
      defaultVal: "(json)=>{ this.queryToMain() }"
    },
    {
      key: "collapse",
      para: "collapse",
      statement: "是否显示折叠按钮",
      type: "boolean",
      defaultVal: "false"
    },
    {
      key: "collapsedShowRow",
      para: "collapsedShowRow",
      statement: "折叠时展示几行",
      type: "string",
      defaultVal: "1"
    },
    {
      key: "buttonsColSpan",
      para: "buttonsColSpan",
      statement: "按钮占用位置的大小",
      type: "number",
      defaultVal: "4"
    },
    {
      key: "justify",
      para: "justify",
      statement: "对齐方式",
      type: "string",
      defaultVal: "'start'"
    },
    {
      key: "reset",
      para: "reset",
      statement: "点击重置时执行的方法",
      type: "function:(initJson)=>{}",
      defaultVal: "(initJson)=>{ this.props.search(initJson,true) }"
    },
    {
      key: "resetType",
      para: "resetType",
      statement: "1：重置后自动查询（默认，点击重置执行search方法，参数为初始参数）  2：重置后不自动查询",
      type: "number",
      defaultVal: "1"
    },
    {
      key: "wrapClassName",
      para: "wrapClassName",
      statement: "searchForm外层class",
      type: "string",
      defaultVal: ""
    },
    {
      key: "ref",
      para: "ref",
      statement: "获取表单对象，用于操作表单内部方法",
      type: "function",
      defaultVal: "[可在查询时获取：this.searchForm.json]"
    },
  ];

/* searchForm config配置 */
const configColumns  = [
  {
    title: "参数",
    dataIndex: "para",
  },
  {
    width:"50%",
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
const configData = [
  {
    key: "type",
    para: "type",
    statement: "配置类型",
    type: "string",
    defaultVal: "text、number、switch、radio、radioTag、select、selectTree、date、dateRange、custom"
  },
  {
    key: "keyName",
    para: "keyName",
    statement: "搜索字段名",
    type: "string",
    defaultVal: ""
  },
  {
    key: "placeholder",
    para: "placeholder",
    statement: "提示文本",
    type: "string",
    defaultVal: ""
  },
  {
    key: "onChange",
    para: "onChange",
    statement: "改变事件",
    type: "function",
    defaultVal: "()=>{}"
  },
  {
    key: "options",
    para: "options",
    statement: "选择列表",
    type: "array",
    defaultVal: "[]"
  },
  {
    key: "dateType",
    para: "dateType",
    statement: "关于时间的选择类型：week、month（仅当type为date时有效）",
    type: "string",
    defaultVal: "date"
  },
  {
    key: "format",
    para: "format",
    statement: "时间格式化（仅当type为date、dateRange时有效）",
    type: "string / array",
    defaultVal: "'YYYY-MM-DD HH:mm:ss' / ['YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DD HH:mm:ss']"
  },
  {
    key: "showTime",
    para: "showTime",
    statement: "时间页面显示格式（仅当type为date、dateRange时有效）",
    type: "object",
    defaultVal: "{defaultValue: moment('00:00:00', 'HH:mm:ss'), format: 'HH:mm:ss'} / {defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')], format: 'HH:mm:ss'}"
  },
  {
    key: "beginKeyName",
    para: "beginKeyName",
    statement: "搜索字段名1（仅当type为dateRange时有效）",
    type: "string",
    defaultVal: ""
  },
  {
    key: "endKeyName",
    para: "endKeyName",
    statement: "搜索字段名2（仅当type为dateRange时有效）",
    type: "string",
    defaultVal: ""
  },
  {
    key: "colSpan",
    para: "colSpan",
    statement: "占据的列宽",
    type: "number",
    defaultVal: "4"
  },
  {
    key: "mdColSpan",
    para: "mdColSpan",
    statement: "中屏时占据的列宽（≥768px）",
    type: "number",
    defaultVal: "6"
  },
  {
    key: "smColSpan",
    para: "smColSpan",
    statement: "小屏时占据的列宽（≥576px）",
    type: "number",
    defaultVal: "8"
  },
  {
    key: "xsColSpan",
    para: "xsColSpan",
    statement: "超小屏时占据的列宽（<576px）",
    type: "number",
    defaultVal: "12"
  },
];

export default class SearchFormDemo extends CodeStatus {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.searchConfig=[
      {
        name: "姓名",
        type: "text",
        keyName: "name",
        placeholder: "请输入姓名",
      },
      {
        name: "年龄",
        type: "number",
        keyName: "age",
        placeholder: "请输入年龄",
      },
      {
        name: "性别",
        type: "radio",
        keyName: "sex",
        defaultValue:1,
        options: [
          { value: 1, label: "男" },
          { value: 2, label: "女" },
        ]
      },
      {
        name: "爱好",
        type: "radioTag",
        keyName: "habby",
        defaultValue:1,
        options: [
          { value: 1, label: "唱歌" },
          { value: 2, label: "跳舞" },
          { value: 3, label: "画画" },
        ]
      },
      {
        name: "类型",
        type: "select",
        keyName: "type",
        defaultValue:1,
        options: [
          { value: "", label: "全部" },
          { value: "0", label: "000" }, // 注：value不可以为0，否则获取json时获取不到该值
          { value: 1, label: "111" },
          { value: 2, label: "222" },
          { value: 3, label: "333" }
        ]
      },
      {
        name: "天",
        keyName: "beginDate",
        type: "date",
        placeholder: "请选择时间",
        // disabledDate:(current)=>{
        //     return current && current < moment("2018-08-14", "YYYY-MM-DD")
        // }
      },
      {
        name: "周",
        keyName: "beginWeek",
        type: "date",
        dateType: "week",
        placeholder: "请选择时间"
      },
      {
        name: "月份",
        keyName: "beginMonth",
        type: "date",
        dateType: "month",
        placeholder: "请选择时间"
      },
      {
        name: "时间范围",
        type: "dateRange",
        keyName: "time",
        beginKeyName: "startTime",
        endKeyName: "endTime",
        colSpan: 8,
        itemInputStyle:{width:"100%"}
      },
      {
        name: "单个时间",
        type: "date",
        keyName: "time",
        format: "YYYY-MM-DD HH:mm:ss",
        showTime: {defaultValue: moment('00:00:00', 'HH:mm:ss'), format: 'HH:mm:ss'},
        colSpan: 4,
      },
      {
        name: "时间段",
        type: "dateRange",
        keyName: "time",
        beginKeyName: "startTime",
        endKeyName: "endTime",
        format: ["YYYY-MM-DD HH:mm:ss", "YYYY-MM-DD HH:mm:ss"],
        showTime: {defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')], format: 'HH:mm:ss'},
        colSpan: 8,
        mdColSpan: 10,
        smColSpan: 10,
        xsColSpan: 16,
        itemInputStyle:{width:"100%"}
      }
    ]
  }

  queryData = json => {};

  render() {
    const { isCodeCollpase } = this.state;
    return (
      <div>
        <h2>以下是 SearchForm 示例：</h2>
        <SearchForm
          config={this.searchConfig}
          search={(params,isReset)=>this.queryData({...params,pageNo:1},isReset)} //必须把params传递下去，否则点击重置按钮时：赋了初值的过滤项会得到 ""
          // reset={this.resetSearch}
          // collapse={true}
          // buttonsColSpan={4}
          ref={ins=>this.searchFormIns=ins}
        />


        {this.controlCode()}
        <CodeLight isCodeCollpase={isCodeCollpase} codeString={codeString} />

        {/* 参数说明 */}
        <h2>组件属性</h2>
        <Doc col={columns} data={data} />

        <h2 style={{marginTop:20}}>config配置</h2>
        <Doc col={configColumns} data={configData} />
      </div>
    );
  }
}
