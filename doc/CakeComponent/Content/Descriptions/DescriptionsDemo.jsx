import React, { Component } from "react";
import CodeStatus from "../../../components/codeStatus.jsx";
import Doc from "../../../components/doc.jsx";
import { Button } from "antd";
import { DetailDescriptions, PopDetailDescriptions } from "cake-ui/src";

//组件属性
const propsConfig = [
	{
		key: "title",
		param: "title",
		explain: "描述列表的标题，显示在最顶部",
		type: "ReactNode",
		defaultValue: "",
	},
	{
		key: "bordered",
		param: "bordered",
		explain: "是否展示边框",
		type: "boolean",
		defaultValue: "	false",
	},
	{
		key: "column",
		param: "column",
		explain: "列数量",
		type: "number || object",
		defaultValue: "3 || { xs: 8, sm: 16, md: 24}",
	},
	{
		key: "size",
		param: "size",
		explain: "描述列表的大小（只有设置 bordered={true} 生效）",
		type: "string",
		defaultValue: "default（默认） | middle | small",
	},
	{
		key: "layout",
		param: "layout",
		explain: "描述布局",
		type: "string",
		defaultValue: "horizontal（默认） | vertical",
	},
	{
		key: "colon",
		param: "colon",
		explain: "是否允许配置 Descriptions.Item 的 colon 值",
		type: "boolean",
		defaultValue: "true",
	},
	{
		key: "ellipsis",
		param: "ellipsis",
		explain: "是否所有配置项值单行省略",
		type: "boolean",
		defaultValue: "false",
	},
	{
		key: "items",
		param: "items",
		explain: "每一项配置",
		type: "array",
		defaultValue: "[]",
	},
	{
		key: "data",
		param: "data",
		explain: "详情数据",
		type: "object",
		defaultValue: "{}",
	},
];
// DescriptionItem属性
const DescriptionItemConfig = [
	{
		key: "label",
		param: "label",
		explain: "内容的描述",
		type: "ReactNode",
		defaultValue: "	",
	},
	{
		key: "span",
		param: "span",
		explain: "包含列的数量",
		type: "number",
		defaultValue: "1",
	},
	{
		key: "ellipsis",
		param: "ellipsis",
		explain: "是否当前配置项值单行省略",
		type: "boolean",
		defaultValue: "false",
	},
];
// initData配置
const initDataConfig = [
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
		key: "items",
		param: "items",
		explain: "每一项配置",
		type: "array",
		defaultValue: "[]",
	},
	{
		key: "data",
		param: "data",
		explain: "详情数据",
		type: "object",
		defaultValue: "{}",
	},
	{
		key: "onCancel",
		param: "onCancel",
		explain: "关闭弹框执行回调",
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
// buttonConfig配置
const buttonConfig = [
	{
		key: "buttonConfig",
		param: "",
		explain: "buttonConfig值若为false，则不显示按钮",
		type: "bool  |  object",
		defaultValue: "false | {}",
	},
	{
		key: "style",
		param: "style",
		explain: "按钮配置样式，可控制按钮居中、右对齐（ justify-content: flex-end;）",
		type: "object",
		defaultValue: "{}",
	},
];

const detail = {
	id: 75,
	moduleName: "cygg_app",
	requireName: "cygg_app",
	taskTypeName: "开发",
	productName: "cygg",
	finishTime: "2020-02-04",
	expectedTime: "80",
	stage: 22,
	priorityName: "重要",
	createTime: "2019-12-23 16:28",
	leaderName: "小明",
	correlationMemberName: "小红",
	expectedStartTime: "2019-12-23",
	name: "cygg_app前端开发",
	expectedEndTime: "2020-01-05",
	projectName: "cygg_app",
	createName: "Tony",
	status: 11,
	descp: "cygg_app前端开发数据大V放到数据库数据好的吧是数据好的必定是数据库都不舍得dfbgdkgfdn",
};
const basicInfoName = [
	{ key: "name", label: "任务名称", span: 2 },
	{ key: "taskTypeName", label: "任务类型" },
	{ key: "productName", label: "所属产品" },
	{ key: "projectName", label: "所属项目" },
	{ key: "moduleName", label: "所属模块" },
	{ key: "requireName", label: "所属需求" },
	{ key: "priorityName", label: "优先级" },
	{ key: "leaderName", label: "指派给" },
	{ key: "correlationMemberName", label: "协同人员" },
	{ key: "expectedTime", label: "预计时长" },
	{ key: "actualTime", label: "实际时长" },
	{ key: "", label: "日程规划", value: detail.expectedStartTime + " ~ " + detail.expectedEndTime },
	{ key: "finishTime", label: "完成时间" },
	{ key: "stage", label: "阶段" },
	{ key: "status", label: "状态" },
	{ key: "createName", label: "创建人" },
	{ key: "modifyTime", label: "修改时间", value: detail.modifyTime || detail.createTime },
	{ key: "descp", label: "任务描述", span: 2, ellipsis: true },
];

export default class DescriptionsDemo extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			modalVisible: false,
		};
	}

	showDetailModal = () => {
		this.detailData = {
			title: "详情",
			modalWidth: 800,
			bodyStyle: { maxHeight: 600, overflowY: "auto" },
			items: basicInfoName,
			data: item,
			onCancel: () => {
				this.setState({ modalVisible: false });
			},
		};
		this.setState({ modalVisible: true });
	};

	render() {
		return (
			<div>
				<h2>详情描述 示例</h2>

				<div style={{ display: "flex", justifyContent: "space-between" }}>
					{/* 单个详情 */}
					<div style={{ width: "48%" }}>
						<DetailDescriptions items={basicInfoName} data={detail} />

						<CodeStatus>{`
import { DetailDescriptions } from "cake-ui";

const detail=${JSON.stringify(detail, null, 2)}

const basicInfoName=${JSON.stringify(basicInfoName, null, 2)}

<DetailDescriptions items={basicInfoName} data={detail}/>
                    `}</CodeStatus>
					</div>

					{/* 弹框详情 */}
					<div style={{ width: "48%" }}>
						<Button
							onClick={() => {
								this.showDetailModal();
							}}
							type="primary"
						>
							详情
						</Button>

						<PopDetailDescriptions
							initData={this.detailData}
							modalVisible={this.state.modalVisible}
						/>

						<CodeStatus>{`
import {Button} from "antd"
import { PopDetailDescriptions } from "cake-ui";

this.state = {
    modalVisible:false,
}
const detail=${JSON.stringify(detail, null, 2)}

const basicInfoName=${JSON.stringify(basicInfoName, null, 2)}

showDetailModal = () => {
    this.detailData = {
        title: "详情",
        modalWidth: 800,
        bodyStyle: { maxHeight: 600, overflowY: "auto" },
        items: basicInfoName,
        data: item,
        onCancel: () => {
            this.setState({ modalVisible: false });
        },
    };
    this.setState({ modalVisible: true });
};

<Button onClick={() => { this.showDetailModal() }} type="primary">详情</Button>
            
<PopDetailDescriptions
    initData={this.detailData}
    modalVisible={this.state.modalVisible}
/>
                    `}</CodeStatus>
					</div>
				</div>

				{/* 参数说明 */}
				<h2>组件属性</h2>
				<Doc dataList={propsConfig} />

				<h2>DescriptionItem属性</h2>
				<Doc dataList={DescriptionItemConfig} />

				<h2 style={{ marginTop: 20 }}>initData配置</h2>
				<Doc dataList={initDataConfig} />

				<h2 style={{ marginTop: 20 }}>buttonConfig配置</h2>
				<Doc dataList={buttonConfig} />
			</div>
		);
	}
}
