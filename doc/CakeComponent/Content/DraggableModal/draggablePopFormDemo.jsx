import React, { Component } from "react";
import CodeStatus from "../../../components/codeStatus.jsx";
import Doc from "../../../components/doc.jsx";
import { DraggablePopForm, CheckTagGroup, TransferTag, WangEditor } from "cake-ui/src";
import { Form, Button,InputNumber } from "antd";
import moment from "moment";
// 自定义表单组件
const FormItem = Form.Item;


//组件属性
const propsConfig = [
  {
    key: "initData",
    param: "initData",
    explain: "弹框表单的配置项，详见initData配置",
    type: "object",
    defaultValue: "{}",
  },
  {
    key: "modalVisible",
    param: "modalVisible",
    explain: "弹出框是否可见",
    type: "boolean",
    defaultValue: "false",
  },
];
// initData配置
const initDataConfig=[
  {
    key: "title",
    param: "title",
    explain: "弹框标题",
    type: "string",
    defaultValue: "",
  },
  {
    key: "modalWidth",
    param: "modalWidth",
    explain: "弹框宽度",
    type: "number",
    defaultValue: "",
  },
  {
    key: "closable",
    param: "closable",
    explain: "是否显示右上角的关闭按钮",
    type: "boolean",
    defaultValue: "true",
  },
  {
    key: "maskClosable",
    param: "maskClosable",
    explain: "点击蒙层是否允许关闭",
    type: "boolean",
    defaultValue: "false",
  },
  {
    key: "destroyOnClose",
    param: "destroyOnClose",
    explain: "关闭时销毁 Modal 里的子元素",
    type: "boolean",
    defaultValue: "false",
  },
  {
    key: "formLayout",
    param: "formLayout",
    explain: "表单排列方式",
    type: "string",
    defaultValue: "'horizontal'（默认）、'vertical'、'inline'、'double'",
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
    key: "initialValues",
    param: "initialValues",
    explain: "表单初始值，如果与 FormItem 的 initialValue 冲突则以 Form 为准",
    type: "object",
    defaultValue: "{}",
  },
  {
    key: "itemList",
    param: "itemList",
    explain: "表单配置，详见itemList配置",
    type: "array",
    defaultValue: "[]",
  },
  {
    key: "itemStyle",
    param: "itemStyle",
    explain: "表单项统一样式配置",
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
    defaultValue: "取消",
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
  {
    key: "buttonConfig",
    param: "buttonConfig",
    explain: "表单button按钮配置",
    type: "object",
    defaultValue: "若为false则该表单没有按钮，详见下方buttonConfig",
  },
]
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
  {
    key: "formItemLayout",
    param: "formItemLayout",
    explain: "单个表单项（自定义）label、value布局占比",
    type: "object",
    defaultValue: "{}",
  },
  {
    key: "itemStyle",
    param: "itemStyle",
    explain: "单个表单项（自定义）样式",
    type: "object",
    defaultValue: "{}",
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

export default class DraggablePopFormTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible1: false,
      modalVisible2: false,
    };
  }

  initData1 = () => {
    return {
      title: "简单版",
      modalWidth: 560,
      itemList: [
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
      ],
      onCancel: () => {
        this.setState({ modalVisible1: false });
      },
      onOk: (values) => {
        console.log(values, "---onOk");
      },
    };
  };

  initData2 = () => {
    return {
      title: "复杂版",
      modalWidth: 800,
      itemList: [
        {
          name: "ID",
          type: "text",
          keyName: "id",
          visible:false,
        },
        {
          name: "上传文件",
          type: "file",
          keyName: "file",
          placeholder: "请上传",
          onChange: (e, form) => {},
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
            render: () => <WangEditor 
                  // uploadImgServer={this.dataUrl + UPLOAD_FILE_DATA}
                  // uploadImgParams={{login_yes:"01450afeea6c4048846ff8121aa8b764"}}
                  // uploadImgHooks={{
                  //     success: (xhr, editor, result)=>{
                  //         const res=JSON.parse(result)
                  //         const url = this.dataUrl + DOWNLOAD_FILE_DATA + "/" + res.content;
                  //         editor.cmd.do('insertHTML', `<img src="${  url  }"/>`);
                  //     }
                  // }}
              />,
        },
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
      ],
      onCancel: () => {
        this.setState({ modalVisible2: false });
      },
      onOk: (values) => {
        console.log(values, "---onOk");
      },
      buttonConfig:{ // 若为false则该表单没有按钮
        showCancelBtn:true, //是否显示取消按钮
        showOkBtn:true, //是否显示确定按钮
        beforeCustomChildren:()=>{ //确定按钮之前的自定义按钮
            return (
                <Button onClick={()=>{this.popFormIns.myform.formRef.resetFields()}} style={{marginRight:16}}>重置</Button>
            )
        },
        afterCustomChildren:()=>null,//确定按钮之后的自定义按钮
        style:{},
      },
    };
  };

  render() {

    return (
      <div>
        <h2>DraggablePopForm 示例：</h2>
        
        <div style={{display:"flex",justifyContent:"space-between"}}>

          {/* 简单版 */}
          <div style={{width:"48%"}}>
            <Button onClick={() => { this.setState({ modalVisible1: true })}} type="primary">简单版</Button>
            
            <DraggablePopForm
              initData={this.initData1()}
              modalVisible={this.state.modalVisible1}
            />

            <CodeStatus>{`
import { DraggablePopForm } from "cake-ui"

const initData=${JSON.stringify(this.initData1(), null, 2)}

<DraggablePopForm
  initData={initData}
  modalVisible={this.state.modalVisible1}
/>
            `}</CodeStatus>
          </div>


          {/* 复杂版 */}
          <div style={{width:"48%"}}>
            <Button onClick={() => { this.setState({ modalVisible2: true })}} type="primary">复杂版</Button>

            <DraggablePopForm
              initData={this.initData2()}
              modalVisible={this.state.modalVisible2}
              ref={ins=>this.popFormIns=ins}
            >
              <div style={{padding:"10px 24px 0",color:"#1890ff"}}>完善信息后可用新验证登录</div>
            </DraggablePopForm>

            <CodeStatus>{`
import { DraggablePopForm } from "cake-ui"

const initData=${JSON.stringify(this.initData2(), null, 2)}

<DraggablePopForm
  initData={initData}
  modalVisible={this.state.modalVisible2}
>
  <div style={{padding:"10px 24px 0",color:"#1890ff"}}>完善信息后可用新验证登录</div>
</DraggablePopForm>
            `}</CodeStatus>
          </div>

        </div>
          

        {/* 参数说明 */}
        <h2>组件属性</h2>
        <Doc dataList={propsConfig} />
        
        {/* 参数说明 */}
        <h2 style={{ marginTop: 20 }}>initData配置</h2>
        <Doc dataList={initDataConfig} />

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
