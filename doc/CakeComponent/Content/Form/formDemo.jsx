import React, { Component } from "react";
import CodeStatus from "../../../components/codeStatus.jsx";
import Doc from "../../../components/doc.jsx";
import { MyForm, CheckTagGroup, TransferTag, WangEditor } from "cake-ui/src";
import { Form, Button, InputNumber, TimePicker, Upload } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import moment from "moment";

// 自定义表单组件
const FormItem = Form.Item;

//组件属性
const propsConfig = [
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
];
// itemList配置
const itemListConfig = [
	{
		key: "type",
		param: "type",
		explain: "表单项类型",
		type: "string",
		defaultValue:
			"text、number、password、verify、textarea、radio、checkbox、select、date、dateRange、file、custom",
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
		defaultValue: "[]",
	},
	{
		key: "picker",
		param: "picker",
		explain: "关于时间的选择类型：'date' 'week' 'month' 'quarter' 'year'（仅当type为date时有效）",
		type: "string",
		defaultValue: "date",
	},
	{
		key: "format",
		param: "format",
		explain: "时间格式化（仅当type为date、dateRange时有效）",
		type: "string",
		defaultValue: "YYYY-MM-DD HH:mm:ss",
	},
	{
		key: "showTime",
		param: "showTime",
		explain: "时间页面显示格式（仅当type为date、dateRange时有效）",
		type: "object",
		defaultValue:
			"{defaultValueue: moment('00:00:00', 'HH:mm:ss'), format: 'HH:mm:ss'} / {defaultValueue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')], format: 'HH:mm:ss'}",
	},
	{
		key: "beginKeyName",
		param: "beginKeyName",
		explain: "字段名1（仅当type为dateRange时有效）",
		type: "string",
		defaultValue: "",
	},
	{
		key: "endKeyName",
		param: "endKeyName",
		explain: "字段名2（仅当type为dateRange时有效）",
		type: "string",
		defaultValue: "",
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
const buttonConfig = [
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
		explain: "按钮配置样式，可控制按钮居中、右对齐（ justify-content: flex-end;）",
		type: "object",
		defaultValue: "{}",
	},
];

export default class MyFormTest extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fileList: [], //文件列表
			fileLoading: false,
			pictureList: [], //图片列表
			picUrl: "", //单个图片地址
		};
	}

	// 图片验证
	beforeUpload = file => {
		const isJPG = file.type === "image/jpeg" || file.type === "image/png";
		if (!isJPG) {
			Message.error("请上传格式为jpg/png的图片!");
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			Message.error("Image must smaller than 2MB!");
		}
		return isJPG && isLt2M;
	};
	// 图片上传
	upLoadFile = file => {
		// uploadFileToData: (url, params) => PostMethod(url, {...params,login_yes:"01450afeea6c4048846ff8121aa8b764"},{mode:"cors"}),//上传文件到data
		// Api.uploadFileToData(this.dataUrl + UPLOAD_FILE_DATA, { file }).then(
		//     res => {
		//         const {pictureList=[]} = this.state
		//         const url = this.dataUrl + DOWNLOAD_FILE_DATA + "/" + res.content;
		//         pictureList.push({uid:pictureList.length+1,url})
		//         this.setState({pictureList})
		//     }
		// );
	};
	// 图片删除
	removeFile = file => {
		const pics = [...this.state.pictureList];
		this.setState({ pictureList: pics.filter(item => item.uid !== file.uid) });
	};

	onOk = json => {
		console.log(json, "----onOk");
		// this.myform.formRef.validateFields().then(values => {
		//   const params = {...values };
		//   Api.handWorkOrder(params).then(res => {
		//     Message.success(res.message);
		//   });
		// });
	};
	render() {
		const itemList = [
			// {
			//     name: "洲际",
			//     type: "select",
			//     keyName: "stateId",
			//     placeholder: "请选择洲际",
			//     defaultValue: item.stateId ? item.stateId : "",
			//     options:[...this.state.stateList],
			//     rules: [
			//         {required: true, message: "请选择洲际"}
			//     ],
			//     onChange:(value,option,form)=>{
			//         //获取我们地区列表(根据洲际id)
			//         Api.getAreaCombineList({stateId:value})
			//             .then(res=>{
			//                 const {baseItemList=[]} = this.state
			//                 if(!isEmpty(baseItemList)){
			//                     baseItemList[2].options=res.content?res.content.map(item=>{return {value:item.id,label:item.simpleName}}):[]
			//                     baseItemList[3].options=[]//联赛下拉
			//                 }
			//                 this.setState({
			//                     baseItemList,
			//                     areaList: res.content?res.content.map(item=>{return {value:item.id,label:item.simpleName}}):[],
			//                     leagueList:[],//联赛下拉
			//                 });
			//             })
			//         form&&form.setFieldsValue({areaId:'',leagueId:''})
			//     },
			// },
			// {
			//     name: "地区",
			//     type: "select",
			//     keyName: "areaId",
			//     placeholder: "请选择地区",
			//     defaultValue: item.areaId ? item.areaId : "",
			//     options:[...this.state.areaList],
			//     rules: [
			//         {required: true, message: "请选择地区"}
			//     ],
			//     onChange:(value,option,form)=>{
			//         //获取我们的联赛列表(根据地区id)
			//         Api.getLeagueCombineList({areaId:value})
			//             .then(res=>{
			//                 const {baseItemList=[]} = this.state
			//                 if(!isEmpty(baseItemList)){
			//                     baseItemList[3].options=res.content?res.content.map(item=>{return {value:item.id,label:item.simpleShortName}}):[]
			//                 }
			//                 this.setState({
			//                     baseItemList,
			//                     leagueList: res.content?res.content.map(item=>{return {value:item.id,label:item.simpleShortName}}):[],
			//                 });
			//             })
			//         form&&form.setFieldsValue({leagueId:''})
			//     },
			// },
			// {
			//     name: "联赛",
			//     type: "select",
			//     keyName: "leagueId",
			//     placeholder: "请选择联赛",
			//     defaultValue: item.leagueId ? item.leagueId : "",
			//     options:[...this.state.leagueList],
			//     rules: [
			//         {required: true, message: "请选择联赛"}
			//     ],
			{
				name: "ID",
				type: "text",
				keyName: "id",
				visible: false,
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
				name: "单选框",
				type: "radio",
				keyName: "radioTest",
				defaultValue: "1",
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
				defaultValue: ["1"],
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
				defaultValue: "1",
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
				defaultValue: moment(),
				rules: [{ required: true, message: "请选择" }],
				placeholder: "请选择时间",
				disabledDate: current => {
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
					defaultValue: [moment("00:00:00", "HH:mm:ss"), moment("23:59:59", "HH:mm:ss")],
					format: "HH:mm:ss",
				},
			},
			{
				name: "自定义编辑器",
				type: "custom",
				keyName: "editor",
				rules: [{ required: true, message: "请填写" }],
				render: () => (
					<WangEditor
					// uploadImgServer={this.dataUrl + UPLOAD_FILE_DATA}
					// uploadImgParams={{login_yes:"01450afeea6c4048846ff8121aa8b764"}}
					// uploadImgHooks={{
					//     success: (xhr, editor, result)=>{
					//         const res=JSON.parse(result)
					//         const url = this.dataUrl + DOWNLOAD_FILE_DATA + "/" + res.content;
					//         editor.cmd.do('insertHTML', `<img src="${  url  }"/>`);
					//     }
					// }}
					/>
				),
			},
			{
				name: "上传文件", //txt、word、excel、zip
				type: "file",
				keyName: "file",
				placeholder: "请上传",
				onChange: (e, form) => {},
			},
			{
				name: "上传附件",
				type: "file",
				keyName: "uploadAttachments",
				placeholder: "请上传附件",
				defaultValue: item.uploadAttachments ? item.uploadAttachments : "",
				rules: [{ required: true, message: "请上传附件" }],
				beforeUpload: (file, fileList, form) => {
					// 上传文件接口
					// Api.upload({file: file}).then(
					//     res => {
					//         const url =  res.content[0];
					//         form.setFieldsValue({'uploadAttachments': url}) ;
					//     }
					// );
					// 返回 false 后变为手动上传文件
					return false;
				},
			},
			{
				name: "上传附件",
				type: "custom",
				keyName: "uploadAttachments",
				itemStyle: { marginBottom: 10 },
				render: form => {
					return (
						<div style={{ display: "flex", flexWrap: "nowrap", alignItems: "center" }}>
							<Upload
								showUploadList={false}
								action={file => {
									this.setState({ fileLoading: true, fileName: file.name });
									// this.upLoadFile(file,"uploadAttachments")
								}} //上传文件
							>
								{this.state.fileLoading ? (
									<Button disabled>
										<LoadingOutlined />
										上传中
									</Button>
								) : this.state.uploadAttachments ? (
									<div className="blue single-ellipsis" style={{ width: 200 }}>
										<Tooltip placement="topLeft" title={this.state.fileName}>
											{this.state.fileName}
										</Tooltip>
									</div>
								) : (
									<Button>
										<PlusOutlined />
										<span>点击上传</span>
									</Button>
								)}
							</Upload>
						</div>
					);
				},
			},
			{
				name: "附件",
				keyName: "attachment",
				type: "custom",
				rules: [],
				render: form => {
					return (
						<Upload
							showUploadList={false}
							// 上传文件改变时的状态
							onChange={info => {
								const { fileList = [] } = this.state;
								const { file } = info;
								this.setState({ fileLoading: true });
								// 通用上传附件，获取返回地址
								// Api.upLoadAttachment({file:file})
								//     .then(res=>{
								//         const {url=""} = res.content
								//         // fileList.push(url)
								//         // 只允许上传一个文件
								//         fileList[0]=url
								//         this.setState({
								//             fileLoading:false,
								//             fileList
								//         })
								//     })
								//     .catch(res=>{
								//         this.setState({fileLoading:false})
								//     })
							}}
							// 上传文件之前的钩子: (file) => {return false},返回 false 后变为手动上传文件(不会出现进度条)
							beforeUpload={(file, fileList) => false}
							withCredentials
						>
							{this.state.fileLoading ? (
								<Button disabled>
									<LoadingOutlined />
									上传中
								</Button>
							) : (
								<div style={{ display: "flex", alignItems: "center" }}>
									{!isEmpty(this.state.fileList) ? (
										<div style={{ minWidth: 100, maxWidth: 460 }} className="single-ellipsis">
											<Tooltip title={this.state.fileList[0]} placement="topLeft">
												<span>{this.state.fileList[0]}</span>
											</Tooltip>
										</div>
									) : (
										<Button>
											<PlusOutlined />
											<span>点击上传</span>
										</Button>
									)}
									{!isEmpty(this.state.fileList)
										? [
												<a
													className="blue"
													href="javascript:;"
													onClick={e => {
														// 阻止默认上传事件
														e && e.preventDefault();
														e && e.stopPropagation();
														//下载通用附件
														// loadFileByGet(window.location.protocol+"//"+window.location.host+COMMON_DOWNLOADATTACHMENT,{url:getFileUrl(this.state.fileList[0])})
													}}
													style={{ margin: "0 12px" }}
												>
													下载
												</a>,
												<a
													target="_blank"
													// download={false}
													href="javascript:;"
													onClick={e => {
														// 阻止默认上传事件
														e && e.preventDefault();
														e && e.stopPropagation();
														const url = this.state.fileList[0];
														const arr = url.split(".");
														//新窗口打开路由 +window.location.host
														// const src="http://192.168.0.253:17303"+COMMON_DOWNLOADATTACHMENT+"?url="+arr[0]+".pdf"
														const src =
															window.location.protocol +
															"//" +
															window.location.host +
															+"?url=" +
															arr[0] +
															".pdf";
														// console.log("编码前组装的src参数：",src)
														// window.open("#/Preview?src="+
														//     encodeURIComponent(src)
														// )
													}}
												>
													预览
												</a>,
										  ]
										: ""}
								</div>
							)}
						</Upload>
					);
				},
				itemStyle: { width: "100%" },
			},
			{
				name: "单个头像图片", //png、jpg、jpeg
				type: "custom",
				keyName: "activatedPic",
				itemStyle: { marginBottom: 0 },
				render: form => {
					return (
						<div style={{ display: "flex", flexWrap: "nowrap", alignItems: "center" }}>
							<Upload
								listType="picture-card"
								showUploadList={false}
								action={file => this.upLoadFile(file, "activatedPic")} //上传文件
								beforeUpload={beforeUpload} //文件类型检测
							>
								{this.state.picUrl ? (
									<img src={this.state.picUrl} alt="avatar" style={{ width: "100%" }} />
								) : (
									uploadButton
								)}
							</Upload>
						</div>
					);
				},
			},
			{
				name: "图片列表", //png、jpg、jpeg
				type: "custom",
				keyName: "breviaryPicture",
				itemStyle: { marginBottom: 0 },
				render: form => {
					return (
						<div style={{ display: "flex", flexWrap: "nowrap", alignItems: "center" }}>
							<Upload
								customRequest={() => {}} //阻止默认上传
								action={file => this.upLoadFile(file)} //上传文件
								onRemove={file => this.removeFile(file)} //删除文件
								beforeUpload={file => this.beforeUpload(file)} //文件验证
								listType="picture-card"
								fileList={this.state.pictureList || []}
								showUploadList={{
									showPreviewIcon: false,
									showRemoveIcon: true,
								}}
							>
								{this.state.pictureList.length >= 3 ? null : <PlusOutlined />}
							</Upload>
						</div>
					);
				},
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
				name: "买入时段（时刻范围）",
				type: "custom",
				keyName: "buyTime",
				render: form => {
					return (
						<div style={{ display: "flex", flexWrap: "nowrap", alignItems: "center" }}>
							<FormItem
								initialValue=""
								rules={[{ required: true, message: "请选择时间" }]}
								style={{ marginRight: 0 }}
							>
								<TimePicker placeholder="（时：分）" format={"HH:mm"} />
							</FormItem>
							<span style={{ margin: "0 16px 24px" }}> ~ </span>
							<FormItem initialValue="" rules={[{ required: true, message: "请选择时间" }]}>
								<TimePicker placeholder="（时：分）" format={"HH:mm"} />
							</FormItem>
						</div>
					);
				},
				itemStyle: { margin: "0px" },
			},
			{
				name: "自定义组合",
				type: "custom",
				keyName: "message",
				itemStyle: { marginBottom: 0 },
				render: form => {
					return (
						<div style={{ display: "flex", flexWrap: "nowrap", alignItems: "center" }}>
							<FormItem
								initialValue=""
								rules={[{ required: false, message: "请选择" }]}
								style={{ marginRight: 16 }}
							>
								<CheckTagGroup
									tags={[
										{ value: "0", label: ">" },
										{ value: "1", label: "<" },
										{ value: "2", label: "=" },
									]}
									tagStyle={{
										width: 45,
										height: 28,
										lineHeight: "28px",
										textAlign: "center",
										border: "1px solid #ddd",
									}}
									type="radioWithCancel"
								/>
							</FormItem>
							<FormItem initialValue="" rules={[{ required: false, message: "请输入" }]}>
								<InputNumber min={0} placeholder="请输入" />
							</FormItem>
						</div>
					);
				},
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
						onOk={json => {
							this.onOk(json);
						}}
						onCancel={() => {}} //可省略
						buttonConfig={{
							// 若为false则该表单没有按钮
							showCancelBtn: true, //是否显示取消按钮
							showOkBtn: true, //是否显示确定按钮
							beforeCustomChildren: () => {
								//确定按钮之前的自定义按钮
								return (
									<Button
										onClick={() => {
											this.myform.formRef.resetFields();
										}}
										style={{ marginRight: 16 }}
									>
										重置
									</Button>
								);
							},
							afterCustomChildren: () => null, //确定按钮之后的自定义按钮
							style: {},
						}}
						ref={form => (this.myform = form)}
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
