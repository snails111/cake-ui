import React, { Component } from 'react';
import CodeStatus from "../../../components/codeStatus.jsx"
import Doc from "../../../components/doc.jsx";
import { DatePicker,Space,Tag} from "antd";
import moment from "moment"
const { RangePicker } = DatePicker;

//组件属性
const propsConfig = [
    {
        key: "picker",
        param: "picker",
        explain: "选择器类型",
        type: "string",
        defaultValue: "date（默认） | week | month | quarter | year"
    },
    {
        key: "disabledDate",
        param: "disabledDate",
        explain: "不可选择的日期",
        type: "function",
        defaultValue: "(currentDate)=>{}"
    },
    {
        key: "disabled",
        param: "disabled",
        explain: "是否禁用",
        type: "boolean",
        defaultValue: "false"
    },
    {
        key: "placeholder",
        param: "placeholder",
        explain: "输入框提示文字",
        type: "string",
        defaultValue: ""
    },
    {
        key: "size",
        param: "size",
        explain: "输入框大小",
        type: "string",
        defaultValue: "small（高24）、middle（默认，高32）、large（高40）"
    },
    {
        key: "bordered",
        param: "bordered",
        explain: "是否有边框",
        type: "boolean",
        defaultValue: "true"
    },
    {
        key: "allowClear",
        param: "allowClear",
        explain: "是否显示清除按钮",
        type: "boolean",
        defaultValue: "true"
    },
    {
        key: "suffixIcon",
        param: "suffixIcon",
        explain: "自定义后缀图标",
        type: "ReactNode",
        defaultValue: ""
    },
    {
        key: "style",
        param: "style",
        explain: "输入框样式",
        type: "CSSProperties",
        defaultValue: ""
    },
    {
        key: "className",
        param: "className",
        explain: "选择器类名",
        type: "string",
        defaultValue: ""
    },
];
//DatePicker属性
const DatePickerConfig = [
    {
        key: "defaultValue",
        param: "defaultValue",
        explain: "默认日期",
        type: "moment",
        defaultValue: ""
    },
    {
        key: "value",
        param: "value",
        explain: "日期（受控）",
        type: "moment",
        defaultValue: ""
    },
    {
        key: "format",
        param: "format",
        explain: "日期格式",
        type: "string",
        defaultValue: "'YYYY-MM-DD'"
    },
    {
        key: "showToday",
        param: "showToday",
        explain: "是否展示“今天”按钮",
        type: "boolean",
        defaultValue: "true"
    },
    {
        key: "showTime",
        param: "showTime",
        explain: "是否展示时间选择功能",
        type: "boolean|object",
        defaultValue: "false|{defaultValue:moment()}"
    },
    {
        key: "disabledTime",
        param: "disabledTime",
        explain: "不可选择的时间",
        type: "function",
        defaultValue: "(date)=>{}"
    },
    {
        key: "renderExtraFooter",
        param: "renderExtraFooter",
        explain: "在面板中添加额外的页脚",
        type: "function",
        defaultValue: "(mode)=>{return React.ReactNode}"
    },
    {
        key: "onOk",
        param: "onOk",
        explain: "点击确定按钮的回调",
        type: "function",
        defaultValue: "()=>{}"
    },
    {
        key: "onChange",
        param: "onChange",
        explain: "时间发生变化的回调",
        type: "function",
        defaultValue: "(date,dateString)=>{}"
    },
    {
        key: "onPanelChange",
        param: "onPanelChange",
        explain: "日期面板变化时的回调",
        type: "function",
        defaultValue: "(value,mode)=>{}"
    },
]
//RangePicker属性
const RangePickerConfig = [
    {
        key: "allowEmpty",
        param: "allowEmpty",
        explain: "允许起始项部分为空",
        type: "[boolean, boolean]",
        defaultValue: "[false, false]"
    },
    {
        key: "separator",
        param: "separator",
        explain: "分隔符",
        type: "string",
        defaultValue: "'~'"
    },
    {
        key: "ranges",
        param: "ranges",
        explain: "预设时间范围快捷选择",
        type: "object",
        defaultValue: "{'今天':moment()}"
    },
    {
        key: "showTime",
        param: "showTime",
        explain: "是否展示时间选择功能",
        type: "boolean|object",
        defaultValue: "false|{defaultValue:[moment(),moment()]}"
    },
    {
        key: "renderExtraFooter",
        param: "renderExtraFooter",
        explain: "在面板中添加额外的页脚",
        type: "function",
        defaultValue: "()=>{return React.ReactNode}"
    },
    {
        key: "defaultValue",
        param: "defaultValue",
        explain: "默认日期",
        type: "moment",
        defaultValue: ""
    },
    {
        key: "value",
        param: "value",
        explain: "日期（受控）",
        type: "moment",
        defaultValue: ""
    },
    {
        key: "format",
        param: "format",
        explain: "日期格式",
        type: "string",
        defaultValue: "'YYYY-MM-DD HH:mm:ss'"
    },
    {
        key: "onChange",
        param: "onChange",
        explain: "时间发生变化的回调",
        type: "function",
        defaultValue: "(dates,dateStrings)=>{}"
    },
    {
        key: "onCalendarChange",
        param: "onCalendarChange",
        explain: "待选日期发生变化的回调",
        type: "function",
        defaultValue: "(dates,dateStrings)=>{}"
    },
]

export default class DatePickerDemo extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          date:""
        }
    }

    render() {
    
      return (
           <div>
              <h2>日历 示例</h2>

              <div style={{display:"flex",justifyContent:"space-between"}}>

                  {/* 单个 */}
                  <div style={{width:"48%"}}>
                    <Space size={20} style={{marginBottom:20}}>
                      <DatePicker onChange={(date,dateString)=>{}} />
                      <DatePicker 
                        value={this.state.date}
                        onChange={(date,dateString)=>{this.setState({date})}} 
                        showToday={false} 
                        renderExtraFooter={()=>(
                          <Space size={10}>
                              <Tag color="blue" style={{cursor:"pointer"}} onClick={()=>{this.setState({date:moment()})}}>今天</Tag>
                              <Tag color="blue" style={{cursor:"pointer"}} onClick={()=>{this.setState({date:moment().subtract(1,"days")})}}>昨天</Tag>
                              <Tag color="blue" style={{cursor:"pointer"}} onClick={()=>{this.setState({date:moment().subtract(7,"days")})}}>一周前</Tag>
                          </Space>
                        )}
                      />
                      <DatePicker onChange={(date,dateString)=>{}} disabled/>
                    </Space>
                    <Space size={20}>
                      <DatePicker onChange={(date,dateString)=>{}} picker="week" />
                      <DatePicker onChange={(date,dateString)=>{}} picker="month" />
                      <DatePicker onChange={(date,dateString)=>{}} picker="year" />
                    </Space>
                    


                    <CodeStatus>{`
import { DatePicker,Space,Tag} from "antd";
import moment from "moment"

this.state = {
  date:""
}

<DatePicker onChange={(date,dateString)=>{}} />
<DatePicker 
  value={this.state.date}
  onChange={(date,dateString)=>{this.setState({date})}} 
  showToday={false} 
  renderExtraFooter={()=>(
    <Space size={10}>
        <Tag color="blue" style={{cursor:"pointer"}} onClick={()=>{this.setState({date:moment()})}}>今天</Tag>
        <Tag color="blue" style={{cursor:"pointer"}} onClick={()=>{this.setState({date:moment().subtract(1,"days")})}}>昨天</Tag>
        <Tag color="blue" style={{cursor:"pointer"}} onClick={()=>{this.setState({date:moment().subtract(7,"days")})}}>一周前</Tag>
    </Space>
  )}
/>
<DatePicker onChange={(date,dateString)=>{}} disabled/>

<DatePicker onChange={(date,dateString)=>{}} picker="week" />
<DatePicker onChange={(date,dateString)=>{}} picker="month" />
<DatePicker onChange={(date,dateString)=>{}} picker="year" />
                    `}</CodeStatus>
                  </div>


                  {/* 范围 */}
                  <div style={{width:"48%"}}>
                    <Space direction="vertical" size={20}>
                      <RangePicker />
                      <RangePicker
                        ranges={{
                          '今天': [moment(), moment()],
                          '昨天': [moment().subtract(1,'days'), moment()],
                          '本月': [moment().startOf('month'), moment().endOf('month')],
                        }}
                        onChange={(date,dateString)=>{}}
                      />
                    </Space>

                    <CodeStatus>{`
import { DatePicker} from "antd";
import moment from "moment"
const { RangePicker } = DatePicker;

<RangePicker />
<RangePicker
  ranges={{
    '今天': [moment(), moment()],
    '昨天': [moment().subtract(1,'days'), moment()],
    '本月': [moment().startOf('month'), moment().endOf('month')],
  }}
  onChange={(date,dateString)=>{}}
/>
                    `}</CodeStatus>
                  </div>

              </div>

               

              {/* 参数说明 */}
              <h2>组件属性</h2>
              <Doc dataList={propsConfig} />
              <h2>DatePicker属性</h2>
              <Doc dataList={DatePickerConfig} />
              <h2>RangePicker属性</h2>
              <Doc dataList={RangePickerConfig} />
           </div>
        );
    }
}
