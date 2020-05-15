import React, { Component } from "react";
import CodeStatus from "../../../components/codeStatus.jsx";
import Doc from "../../../components/doc.jsx";
import { MyForm, CheckTagGroup, TransferTag, WangEditor } from "cake-ui/src";
import { Form, Button,InputNumber } from "antd";
import moment from "moment";
// 自定义表单组件
const FormItem = Form.Item;

//组件属性
const propsConfig = [
  {
    key: "formLayout",
    param: "formLayout",
    explain: "表单的排列方式: horizontal、vertical、inline、double",
    type: "string",
    defaultValue: "horizontal",
  },
  {
    key: "formItemLayout",
    param: "formItemLayout",
    explain: "label和wrapper的宽度比列",
    type: "object",
    defaultValue: "{labelCol: {span: 3}, wrapperCol: {span: 20}}",
  },
  {
    key: "hideRequiredMark",
    param: "hideRequiredMark",
    explain: "隐藏所有表单项的必选标记",
    type: "boolean",
    defaultValue: "false",
  },
  {
    key: "buttonConfig",
    param: "buttonConfig",
    explain: "表单button按钮配置",
    type: "object",
    defaultValue: "若为false则该表单没有按钮，详见下方buttonConfig",
  },
  {
    key: "itemList",
    param: "itemList",
    explain: "配置表单项",
    type: "array",
    defaultValue: "[]，详见下方itemListConfig",
  },
  {
    key: "itemStyle",
    param: "itemStyle",
    explain: "每一个表单项的通用样式",
    type: "object",
    defaultValue: "{}",
  },
  {
    key: "okText",
    param: "okText",
    explain: "表单提交按钮文字",
    type: "string",
    defaultValue: "确定",
  },
  {
    key: "cancelText",
    param: "cancelText",
    explain: "表单取消按钮文字",
    type: "string",
    defaultValue: "确定",
  },
  {
    key: "onOk",
    param: "onOk",
    explain: "提交表单执行回调",
    type: "function",
    defaultValue: "()=>{}",
  },
  {
    key: "onCancel",
    param: "onCancel",
    explain: "取消表单执行回调",
    type: "function",
    defaultValue: "()=>{}",
  },
];
// itemList配置
const itemListConfig = [
  {
    key: "type",
    param: "type",
    explain: "表单项类型",
    type: "string",
    defaultValue: "text、number、password、verify、textarea、radio、checkbox、select、date、dateRange、file、custom",
  },
  {
    key: "name",
    param: "name",
    explain: "label名称",
    type: "string",
    defaultValue: "",
  },
  {
    key: "keyName",
    param: "keyName",
    explain: "values的key值",
    type: "string",
    defaultValue: "",
  },
  {
    key: "defaultValue",
    param: "defaultValue",
    explain: "表单项的默认值",
    type: "string",
    defaultValue: "",
  },
  {
    key: "rules",
    param: "rules",
    explain: "提交表单时的验证，参数validator为自定义验证",
    type: "array",
    defaultValue: `[({ getFieldValue }) => ({
        validator(rule, value) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
          }
          return Promise.reject('密码错误！');
        },
      })]`,
  },
  {
    key: "onChange",
    param: "onChange",
    explain: "表单项内容改变的时候触发",
    type: "function",
    defaultValue: "({...props})=>{const {form} = props}",
  },
  {
    key: "placeholder",
    param: "placeholder",
    explain: "提示文本",
    type: "string",
    defaultValue: "''",
  },
  {
    key: "options",
    param: "options",
    explain: "选择列表",
    type: "array",
    defaultValue: "[]"
  },
  {
    key: "picker",
    param: "picker",
    explain: "关于时间的选择类型：'date' 'week' 'month' 'quarter' 'year'（仅当type为date时有效）",
    type: "string",
    defaultValue: "date"
  },
  {
    key: "format",
    param: "format",
    explain: "时间格式化（仅当type为date、dateRange时有效）",
    type: "string",
    defaultValue: 'YYYY-MM-DD HH:mm:ss'
  },
  {
    key: "showTime",
    param: "showTime",
    explain: "时间页面显示格式（仅当type为date、dateRange时有效）",
    type: "object",
    defaultValue: "{defaultValueue: moment('00:00:00', 'HH:mm:ss'), format: 'HH:mm:ss'} / {defaultValueue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')], format: 'HH:mm:ss'}"
  },
  {
    key: "beginKeyName",
    param: "beginKeyName",
    explain: "字段名1（仅当type为dateRange时有效）",
    type: "string",
    defaultValue: ""
  },
  {
    key: "endKeyName",
    param: "endKeyName",
    explain: "字段名2（仅当type为dateRange时有效）",
    type: "string",
    defaultValue: ""
  },
  {
    key: "visible",
    param: "visible",
    explain: "该表单项是否显示",
    type: "boolean",
    defaultValue: "true",
  },
  {
    key: "disabled",
    param: "disabled",
    explain: "该表单项是否禁用",
    type: "boolean",
    defaultValue: "false",
  },
];
// buttonConfig配置
const buttonConfig=[
    {
        key: "showCancelBtn",
        param: "showCancelBtn",
        explain: "是否显示取消按钮",
        type: "boolean",
        defaultValue: "true",
    },
    {
        key: "showOkBtn",
        param: "showOkBtn",
        explain: "是否显示确定按钮",
        type: "boolean",
        defaultValue: "true",
    },
    {
        key: "beforeCustomChildren",
        param: "beforeCustomChildren",
        explain: "确定按钮之前的自定义按钮",
        type: "function",
        defaultValue: "()=>null",
    },
    {
        key: "afterCustomChildren",
        param: "afterCustomChildren",
        explain: "确定按钮之后的自定义按钮",
        type: "function",
        defaultValue: "()=>null",
    },
    {
        key: "style",
        param: "style",
        explain: "按钮配置样式",
        type: "object",
        defaultValue: "{}",
    },
]

export default class MyFormTest extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const itemList = [
      {
        name: "ID",
        type: "text",
        keyName: "id",
        visible:false,
      },
      {
        name: "文本框",
        type: "text",
        keyName: "text",
        rules: [{ required: true, message: "请填写", whitespace: true }],
        placeholder: "请输入",
        onChange: (e, form) => {},
      },
      {
        name: "数字框",
        type: "number",
        keyName: "number",
        rules: [{ required: true, message: "请填写" }],
        placeholder: "请输入",
      },
      {
        name: "密码框",
        type: "password",
        keyName: "pwd",
        rules: [{ required: true, message: "请填写", whitespace: true }],
        placeholder: "请输入",
      },
      {
        name: "验证码",
        type: "verify",
        keyName: "verifyCode",
        rules: [{ required: true, message: "请填写", whitespace: true }],
        placeholder: "请输入",
        onSearch: (e, form, callBack) => {
          console.log(e);
          callBack();
        },
      },
      {
        name: "文本域",
        type: "textarea",
        keyName: "descp",
        placeholder: "请输入",
      },
      {
        name: "上传文件",
        type: "file",
        keyName: "file",
        placeholder: "请上传",
        onChange: (e, form) => {},
      },
      {
        name: "单选框",
        type: "radio",
        keyName: "radioTest",
        defaultValue:"1",
        options: [
          { value: "1", label: "测试1" },
          { value: "2", label: "测试2" },
          { value: "3", label: "测试3" },
        ],
        rules: [{ required: true, message: "请选择" }],
        placeholder: "请选择",
      },
      {
        name: "复选框",
        type: "checkbox",
        keyName: "checkboxTest",
        defaultValue:["1"],
        options: [
          { value: "1", label: "复选测试1" },
          { value: "2", label: "复选测试2" },
        ],
        rules: [{ required: true, message: "请选择" }],
        placeholder: "请选择",
      },
      {
        name: "下拉框",
        type: "select",
        keyName: "selectTest",
        defaultValue:"1",
        options: [
          { value: "1", label: "选择1" },
          { value: "2", label: "选择2" },
        ],
        rules: [{ required: true, message: "请选择" }],
        placeholder: "请选择",
        onChange: (value, option, form) => {},
      },
      {
        name: "天",
        type: "date",
        keyName: "beginDate",
        defaultValue:moment(),
        rules: [{ required: true, message: "请选择" }],
        placeholder: "请选择时间",
        disabledDate: (current) => {
          return current && current < moment("2020-05-14", "YYYY-MM-DD");
        },
        onChange: (date, dateString, form) => {},
      },
      {
        name: "天带时刻",
        type: "date",
        keyName: "beginDateTime",
        placeholder: "请选择时刻",
        format: "YYYY-MM-DD HH:mm:ss",
        showTime: {
          defaultValue: moment("00:00:00", "HH:mm:ss"),
          format: "HH:mm:ss",
        },
      },
      {
        name: "周",
        type: "date",
        keyName: "beginWeek",
        picker: "week",
        placeholder: "请选择周",
      },
      {
        name: "月份",
        keyName: "beginMonth",
        type: "date",
        picker: "month",
        placeholder: "请选择月份",
      },
      {
        name: "季度",
        type: "date",
        keyName: "beginQuarter",
        picker: "quarter",
        placeholder: "请选择季度",
      },
      {
        name: "年",
        type: "date",
        keyName: "beginYear",
        picker: "year",
        placeholder: "请选择年",
      },
      {
        name: "时间范围",
        type: "dateRange",
        keyName: "dateRange",
        beginKeyName: "dateRangeStartTime",
        endKeyName: "dateRangEndTime",
      },
      {
        name: "时间段",
        type: "dateRange",
        keyName: "dateRangeTime",
        beginKeyName: "startTime",
        endKeyName: "endTime",
        format: "YYYY-MM-DD HH:mm:ss",
        showTime: {
          defaultValue: [
            moment("00:00:00", "HH:mm:ss"),
            moment("23:59:59", "HH:mm:ss"),
          ],
          format: "HH:mm:ss",
        },
      },
      {
          name: "自定义编辑器",
          type: "custom",
          keyName: "editor",
          rules: [{required: true, message: "请填写"}],
          render: () => <WangEditor />,
      },
    //   {
    //       name: "自定义穿梭框",
    //       type: "custom",
    //       keyName: "filter",
    //       validateStatus:"success",
    //       defaultValue:[
    //           {value:1,label:"张三"},
    //           {value:2,label:"李四"},
    //           {value:3,label:"王五"},
    //       ],
    //       rules: [{required: true, message: "请填写"}],
    //       render: () => <TransferTag sourceData={[{value:"1",label:"李四"}]} />,
    //   },
      {
          name: "自定义组合",
          type: "custom",
          keyName: "message",
          itemStyle: {marginBottom: 0},
          render: (form) => {
              return (
                  <div style={{display: "flex", flexWrap: "nowrap", alignItems: "center"}}>
                      <FormItem initialValue="" rules={[{required: false, message: "请选择"}]} style={{marginRight: 16}}>
                            <CheckTagGroup
                                tags={[
                                    {value: "0", label: ">"},
                                    {value: "1", label: "<"},
                                    {value: "2", label: "="}
                                ]}
                                tagStyle={{
                                    width: 45,
                                    height: 28,
                                    lineHeight: "28px",
                                    textAlign: "center",
                                    border: "1px solid #ddd"
                                }}
                                type="radioWithCancel"
                            />
                      </FormItem>
                      <FormItem initialValue="" rules={[{required: false, message: "请输入"}]}>
                            <InputNumber min={0} placeholder="请输入" />
                      </FormItem>
                  </div>
              )
          }
      },
    ];

    return (
      <div>
        <h2>MyForm 示例：</h2>
        <div
          style={{
            display: "inline-block",
            width: 800,
            border: "1px dashed #ddd",
            borderRadius: "4px",
            paddingTop: 20,
          }} 
        >
            <MyForm
                itemList={itemList}
                onOk={(json) => {
                    console.log(json, "----onOk");
                }}
                onCancel={()=>{}} //可省略
                buttonConfig={{ // 若为false则该表单没有按钮
                    showCancelBtn:true, //是否显示取消按钮
                    showOkBtn:true, //是否显示确定按钮
                    beforeCustomChildren:()=>{ //确定按钮之前的自定义按钮
                        return (
                            <Button onClick={()=>{this.myform.formRef.resetFields()}} style={{marginRight:16}}>重置</Button>
                        )
                    },
                    afterCustomChildren:()=>null,//确定按钮之后的自定义按钮
                    style:{},
                }}
                ref={(form) => (this.myform = form)}
            />
        </div>

        <CodeStatus>{`
import { MyForm } from "cake-ui"

const itemList=${JSON.stringify(itemList, null, 2)}

<MyForm
    itemList={itemList}
    onOk={(json) => {
        console.log(json, "----onOk");
    }}
    onCancel={()=>{}} //可省略
    buttonConfig={{ // 若为false则该表单没有按钮
        showCancelBtn:true, //是否显示取消按钮
        showOkBtn:true, //是否显示确定按钮
        beforeCustomChildren:()=>{ //确定按钮之前的自定义按钮
            return (
                <Button onClick={()=>{this.myform.formRef.resetFields()}} style={{marginRight:16}}>重置</Button>
            )
        },
        afterCustomChildren:()=>null,//确定按钮之后的自定义按钮
        style:{},
    }}
    ref={(form) => (this.myform = form)}
/>
                `}</CodeStatus>

        {/* 参数说明 */}
        <h2>组件属性</h2>
        <Doc dataList={propsConfig} />

        {/* 参数说明 */}
        <h2 style={{ marginTop: 20 }}>itemList配置</h2>
        <Doc dataList={itemListConfig} />

        {/* 参数说明 */}
        <h2 style={{ marginTop: 20 }}>buttonConfig配置</h2>
        <Doc dataList={buttonConfig} />
      </div>
    );
  }
}
