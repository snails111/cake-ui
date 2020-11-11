import React, { Component } from "react";
import { Form } from "antd";
import { SearchForm } from "cake-ui/src";
import CodeStatus from "../../../components/codeStatus.jsx";
import Doc from "../../../components/doc.jsx";
import moment from "moment";

/* 组件属性 */
const propsConfig = [
	{
		key: "config",
		param: "config",
		explain: "搜索表单的配置项",
		type: "array",
		defaultValue: "[详见下方config配置]",
	},
	{
		key: "search",
		param: "search",
		explain: "搜索回调",
		type: "function:()=>{}",
		defaultValue: "(json,isReset)=>{ }",
	},
	{
		key: "reset",
		param: "reset",
		explain: "重置回调",
		type: "function:()=>{}",
		defaultValue: "(json)=>{ }",
	},
	{
		key: "resetType",
		param: "resetType",
		explain:
			"1：重置后自动查询（默认，点击重置执行search方法，参数为初始参数）  2：重置后不自动查询",
		type: "number",
		defaultValue: "1",
	},
	{
		key: "defaultExpand",
		param: "defaultExpand",
		explain: "初始默认折叠状态：true:展开",
		type: "boolean",
		defaultValue: "true",
	},
	{
		key: "buttonConfig",
		param: "buttonConfig",
		explain: "搜索按钮配置",
		type: "object",
		defaultValue: JSON.stringify({
			span: 4,
			showSearchBtn: true, // 是否显示搜索按钮
			showResetBtn: true, // 是否显示重置按钮
			customChildren: form => null, // 配置自定义按钮
			collapse: false, // 是否允许折叠
			collapsedShowRow: 1, // 折叠时展示几行
			defaultExpand: true, // 初始默认折叠状态：true:展开
			style: {},
		}),
	},
	{
		key: "justify",
		param: "justify",
		explain: "对齐方式",
		type: "string",
		defaultValue: "'start'",
	},
	{
		key: "wrapFormClassName",
		param: "wrapFormClassName",
		explain: "外层form表单类名",
		type: "string",
		defaultValue: "",
	},
	{
		key: "ref",
		param: "ref",
		explain: "获取表单对象，用于操作表单内部方法",
		type: "function",
		defaultValue: "[可在查询时获取：this.searchForm.json]",
	},
];

/*config配置 */
const configData = [
	{
		key: "type",
		param: "type",
		explain: "配置类型",
		type: "string",
		defaultValue:
			"text、number、switch、radio、radioTag、select、selectTree、date、dateRange、custom",
	},
	{
		key: "keyName",
		param: "keyName",
		explain: "搜索字段名",
		type: "string",
		defaultValue: "",
	},
	{
		key: "placeholder",
		param: "placeholder",
		explain: "提示文本",
		type: "string",
		defaultValue: "",
	},
	{
		key: "onChange",
		param: "onChange",
		explain: "改变事件",
		type: "function",
		defaultValue: "()=>{}",
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
		explain: "搜索字段名1（仅当type为dateRange时有效）",
		type: "string",
		defaultValue: "",
	},
	{
		key: "endKeyName",
		param: "endKeyName",
		explain: "搜索字段名2（仅当type为dateRange时有效）",
		type: "string",
		defaultValue: "",
	},
	{
		key: "colSpan",
		param: "colSpan",
		explain: "占据的列宽",
		type: "number",
		defaultValue: "4",
	},
	{
		key: "mdColSpan",
		param: "mdColSpan",
		explain: "中屏时占据的列宽（≥768px）",
		type: "number",
		defaultValue: "6",
	},
	{
		key: "smColSpan",
		param: "smColSpan",
		explain: "小屏时占据的列宽（≥576px）",
		type: "number",
		defaultValue: "8",
	},
	{
		key: "xsColSpan",
		param: "xsColSpan",
		explain: "超小屏时占据的列宽（<576px）",
		type: "number",
		defaultValue: "12",
	},
];

export default class SearchFormDemo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	queryToMain = (json, isReset) => {
		if (isReset) {
			// this.searchForm.formRef.setFieldsValue({ handId: "" });
		}
		console.log(json, "---searchform search json");
		console.log(this.searchFormIns.json, "---this.searchFormIns.json");
	};
	resetSearch = json => {
		console.log(json, "---searchform resetSearch json");
	};

	// 查询项目列表
	queryProject = () => {
		Api.queryProProjectList().then(res => {
			const data = res.content || [];
			const projectList = data.map(item => {
				return { value: item.id, label: item.proName };
			});
			this.setState({ projectList });
		});
	};
	// 查询业务列表
	queryBussiness = proId => {
		Api.queryProjectList({ proId }).then(res => {
			const data = res.content || [];
			const bussinessList = data.map(item => {
				return { value: item.id, label: item.busName };
			});
			this.setState({ bussinessList, typeList: [] });
		});
	};
	// 查询类型列表
	queryType = (proId, busId) => {
		Api.queryTypeList({ proId, busId }).then(res => {
			const data = res.content || [];
			const typeList = data.map(item => {
				return { value: item.id, label: item.typeName };
			});
			this.setState({ typeList });
		});
	};

	render() {
		const searchConfig = [
			// {
			// 	name: "项目",
			// 	type: "select",
			// 	keyName: "proId",
			// 	options: [{ value: "", label: "全部" }, ...this.state.projectList],
			// 	onChange: (value, option, form) => {
			// 		if (value) {
			// 			this.queryBussiness(value);
			// 		} else {
			// 			this.setState({
			// 				bussinessList: [],
			// 				typeList: [],
			// 			});
			// 		}
			// 		form.setFieldsValue({ busId: "", typeId: "" });
			// 	},
			// },
			// {
			// 	name: "业务",
			// 	type: "select",
			// 	keyName: "busId",
			// 	options: [{ value: "", label: "全部" }, ...this.state.bussinessList],
			// 	onChange: (value, option, form) => {
			// 		if (value) {
			// 			const proId = form.getFieldValue("proId");
			// 			this.queryType(proId, value);
			// 		} else {
			// 			this.setState({
			// 				typeList: [],
			// 			});
			// 		}
			// 		form.setFieldsValue({ typeId: "" });
			// 	},
			// },
			// {
			// 	name: "类型",
			// 	type: "select",
			// 	keyName: "typeId",
			// 	options: [{ value: "", label: "全部" }, ...this.state.typeList],
			// },
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
				defaultValueue: 1,
				options: [
					{ value: 1, label: "男" },
					{ value: 2, label: "女" },
				],
			},
			{
				name: "爱好",
				type: "radioTag",
				keyName: "habby",
				defaultValueue: 1,
				options: [
					{ value: 1, label: "唱歌" },
					{ value: 2, label: "跳舞" },
					{ value: 3, label: "画画" },
				],
			},
			{
				name: "类型",
				type: "select",
				keyName: "type",
				defaultValueue: 1,
				options: [
					{ value: "", label: "全部" },
					{ value: "0", label: "000" }, // 注：value不可以为数字0，否则获取json时获取不到该值
					{ value: 1, label: "111" },
					{ value: 2, label: "222" },
					{ value: 3, label: "333" },
				],
				onChange: (value, option, form) => {},
			},
			{
				name: "天",
				keyName: "beginDate",
				type: "date",
				placeholder: "请选择时间",
				disabledDate: current => {
					return current && current < moment("2020-05-14", "YYYY-MM-DD");
				},
			},
			{
				name: "天带时刻",
				type: "date",
				keyName: "beginDateTime",
				placeholder: "请选择时刻",
				format: "YYYY-MM-DD HH:mm:ss",
				showTime: { defaultValueue: moment("00:00:00", "HH:mm:ss"), format: "HH:mm:ss" },
			},
			{
				name: "周",
				keyName: "beginWeek",
				type: "date",
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
				keyName: "beginQuarter",
				type: "date",
				picker: "quarter",
				placeholder: "请选择季度",
			},
			{
				name: "年",
				keyName: "beginYear",
				type: "date",
				picker: "year",
				placeholder: "请选择年",
			},
			{
				name: "时间段(仅年月日)",
				type: "dateRange",
				keyName: "dateRange",
				beginKeyName: "dateRangeStartTime",
				endKeyName: "dateRangEndTime",
				colSpan: 8,
			},
			{
				name: "时间段(带时分秒)",
				type: "dateRange",
				keyName: "dateRangeTime",
				beginKeyName: "startTime",
				endKeyName: "endTime",
				format: "YYYY-MM-DD HH:mm:ss",
				showTime: {
					defaultValueue: [moment("00:00:00", "HH:mm:ss"), moment("23:59:59", "HH:mm:ss")],
					format: "HH:mm:ss",
				},
				colSpan: 8,
				mdColSpan: 10,
				smColSpan: 10,
				xsColSpan: 16,
			},
			{
				name: "饱和度",
				type: "custom",
				keyName: "saturate",
				render: () => {
					return (
						<div style={{ display: "flex", alignItems: "center" }}>
							<Form.Item
								name="saturateMin"
								rules={[{ required: true }]}
								style={{ display: "inline-block", width: "calc(50% - 8px)", marginRight: "8px" }}
							>
								<Input placeholder="最小值" />
							</Form.Item>
							<span>~</span>
							<Form.Item
								name="saturateMax"
								rules={[{ required: true }]}
								style={{ display: "inline-block", width: "calc(50% - 8px)", marginLeft: "8px" }}
							>
								<Input placeholder="最大值" />
							</Form.Item>
						</div>
					);
				},
			},
		];

		return (
			<div>
				<h2>SearchForm 示例：</h2>
				<SearchForm
					config={searchConfig}
					search={(paramms, isReset) => this.queryToMain({ ...paramms, pageNo: 1 }, isReset)} //必须把paramms传递下去，否则点击重置按钮时：赋了初值的过滤项会得到 ""
					reset={this.resetSearch}
					ref={ins => (this.searchFormIns = ins)}
				/>

				<CodeStatus>{`
import { SearchForm } from "cake-ui"

const searchConfig=${JSON.stringify(searchConfig, null, 2)}

<SearchForm
  config={searchConfig}
  search={(paramms,isReset)=>this.search({...paramms,pageNo:1},isReset)} //必须把paramms传递下去，否则点击重置按钮时：赋了初值的过滤项会得到 ""
  // reset={this.resetSearch}
  ref={ins=>this.searchFormIns=ins}
/>
      `}</CodeStatus>

				{/* 参数说明 */}
				<h2>组件属性</h2>
				<Doc dataList={propsConfig} />

				{/* 参数说明 */}
				<h2 style={{ marginTop: 20 }}>config配置</h2>
				<Doc dataList={configData} />
			</div>
		);
	}
}
