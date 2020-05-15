import React from "react";
import moment from "moment";
import {
    Form,
    Row,
    Col,
    Input,
    InputNumber,
    Select,
    DatePicker,
    Button,
    Switch,
    Radio,
    TreeSelect,
} from "antd";
import { CaretDownOutlined,CaretUpOutlined } from '@ant-design/icons';
import PropTypes from "prop-types";
import CheckTagGroup from "../CheckTagGroup/checkTagGroup";

const FormItem = Form.Item;
const {Option} = Select;
const RadioGroup = Radio.Group;
const {TreeNode} = TreeSelect;
const {RangePicker} = DatePicker;

/*
 * SearchForm 高级搜索表单
 * author：徐静
 * date：2020.05.08
 * */
export default class SearchForm extends React.Component { 
    static propTypes = {
        buttonConfig: PropTypes.object,
        initialValues: PropTypes.object,
        config: PropTypes.array,
        justify: PropTypes.oneOf(['start', 'center', 'end']),
        wrapFormClassName: PropTypes.string,
        search: PropTypes.func,
        reset: PropTypes.func,
        resetType: PropTypes.number
    };
    static defaultProps = {
        buttonConfig: { // 搜索按钮配置
            span:4,
            showSearchBtn:true,// 是否显示搜索按钮
            showResetBtn:true,// 是否显示重置按钮
            customChildren:(form)=>null,// 配置自定义按钮
            collapse:false,// 是否允许折叠
            collapsedShowRow: 1,// 折叠时展示几行
            defaultExpand: true,// 初始默认折叠状态：true:展开
            style:{},
        },
        initialValues: {},//form表单初始值（如果与 FormItem 的 initialValue 冲突则以 Form 为准）
        config: [],// 搜索表单项配置
        justify: "start",// 对齐方式
        wrapFormClassName: "",// 外层form表单类名
        search: (json,isReset) => { // 搜索回调
        },
        reset: (json) => { // 重置回调
        },
        resetType:1 // 1:重置后自动查询  2：重置后不自动查询
    };
    constructor(props) {
        super(props);
        this.state = {
            expand: this.props.buttonConfig.defaultExpand || true // 当前折叠状态
        };
        this.totalColSpan = 0;
        this.json = {};// 提交时获取的表单值
        this.formRef=null
    }

    componentDidMount(){
        this.initJson()
    }

    // 初试化Json
    initJson = () =>{
        this.formRef&&this.formRef.validateFields().then((values) => {
            this.json=values
        })
    }

    // 展开/折叠 表单
    toggle = () => {
        this.setState({expand: !this.state.expand});
    }

    // 表单搜索（自带表单校验）
    handleSearch=(values) =>{
        Object.keys(values).map(i => {
            if (!moment.isMoment(values[i])) {
                this.json[i] = values[i];
            }
            return false;
        })
        Object.keys(this.json).map(i => {
            if (this.json[i] === undefined) {
                this.json[i] = ""
            }
            return false;
        })

        // console.log(this.json, "this.json",values);

        // 调用父组件
        if (this.props.search) {
            this.props.search({...this.json},false);
        }
    }

    // 表单重置
    handleReset=()=> {
        this.json = {};
        this.formRef.resetFields();
        // 获取全部组件的值
        const json=this.formRef.getFieldsValue()
        if (this.props.reset) {
            this.props.reset({...json});
        }
        // resetType：1:重置后自动查询（默认）  2：重置后不自动查询
        if (this.props.resetType===1 && this.props.search) {
            // true：该查询属于重置查询
            this.props.search({...json},true);
        }
    }

    // 获取某一表单项
    getField = (item={}) => {
        const {buttonConfig, buttonsColSpan} = this.props;
        // 默认折叠时仅留一行展示
        const {collapsedShowRow=1} = buttonConfig
        // 初始化this.json
        this.json[item.keyName] = this.json[item.keyName]||item.defaultValue||"";

        const FormItemContainer = ({...props}) => {
            const {item, children} = props
            return (
                <Col
                    key={item.keyName}
                    xl={item.colSpan||4} // ≥1200px
                    lg={item.colSpan||4} // ≥992px
                    md={item.mdColSpan||6} // ≥768px
                    sm={item.smColSpan||8} // ≥576px
                    xs={item.xsColSpan||12} // <576px
                    style={{display: this.totalColSpan <= 24 * collapsedShowRow - buttonsColSpan || this.state.expand ? "block" : "none"}}
                >
                    <div className="form-item-container">
                        <FormItem
                            {...item}
                            label={item.name}
                            name={item.keyName}
                            rules={item.rules ? item.rules : []}
                            initialValue={item.defaultValue ? item.defaultValue : ""}//如果与 Form 的 initialValues 冲突则以 Form 为准
                            style={item.itemStyle}
                        >
                            {children}
                        </FormItem>
                    </div>
                </Col>
            )
        }

        switch (item.type) {
            case "text":
                return (
                    <FormItemContainer item={item}>
                        <Input
                            disabled={item.disabled}
                            onChange={e => {
                                item.onChange&&item.onChange(e, this.formRef);
                            }}
                            placeholder={item.placeholder}
                            style={item.itemInputStyle}
                        />
                    </FormItemContainer>
                );
            case "number":
                return (
                    <FormItemContainer item={item}>
                        <InputNumber
                            disabled={item.disabled}
                            max={item.max}
                            min={item.min}
                            onChange={e => {
                                item.onChange&&item.onChange(e, this.formRef);
                            }}
                            placeholder={item.placeholder}
                            style={item.itemInputStyle}
                        />
                    </FormItemContainer>
                );
            case "switch":
                return (
                    <FormItemContainer item={item}>
                        <Switch checkedChildren="ON" unCheckedChildren="OFF" />
                    </FormItemContainer>
                );
            case "radio":
                return (
                    <FormItemContainer item={item}>
                        <RadioGroup
                            buttonStyle="outline"
                            disabled={item.disabled}
                            onChange={e => {
                                item.onChange&&item.onChange(e, this.formRef);
                            }}
                            style={item.itemInputStyle}
                        >
                            {
                                item.options && item.options.map(op => (
                                    <Radio key={op.value} disabled={item.disabled} value={op.value}>{op.label}</Radio>
                                ))
                            }
                        </RadioGroup>
                    </FormItemContainer>
                );
            // 定制单选tag（带取消选中效果）
            case "radioTag":
                return (
                    <FormItemContainer item={item}>
                        <CheckTagGroup
                            disabled={item.disabled}
                            onChange={checkedList => {
                                if (checkedList && checkedList.length > 0) {
                                    // 选中某一个tag
                                    this.json[item.keyName] = checkedList[0]
                                } else {
                                    // 取消某一个tag
                                    this.json[item.keyName] = ""
                                }
                                item.onChange&&item.onChange(checkedList);
                            }}
                            style={{display: "flex", flexWrap: "nowrap", ...item.itemInputStyle}}
                            tags={item.options}
                            tagStyle={{
                                width: "100%",
                                height: 30,
                                lineHeight: "30px",
                                textAlign: "center",
                                border: "1px solid #ddd",
                            }}
                            tagWrapStyle={{width: "30%", marginRight: "3%"}}
                            type="radioWithCancel"
                        />
                    </FormItemContainer>
                );
            case "select":
                return (
                    <FormItemContainer item={item}>
                        <Select
                            suffixIcon={<CaretDownOutlined />}
                            key={item.value}
                            disabled={item.disabled}
                            filterOption={(input, option) => (
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            )}
                            onChange={(value, option) => {
                                item.onChange&&item.onChange(value, option, this.formRef);
                            }}
                            placeholder={item.placeholder}
                            showSearch={item.showSearch}
                            style={item.itemInputStyle}
                        >
                            {
                                item.options && item.options.map((op) => (
                                    <Option {...op} key={op.value} value={op.value}>{op.label}</Option>
                                ))
                            }
                        </Select>
                    </FormItemContainer>
                );
            case "selectTree":
                return (
                    <FormItemContainer item={item}>
                        <TreeSelect
                            allowClear
                            dropdownStyle={{maxHeight: 300, overflow: 'auto'}}
                            multiple
                            placeholder="请选择坐席"
                            showSearch
                            treeCheckable
                        >
                            {
                                item.options && item.options.map((op) => (
                                    <TreeNode key={op.id} selectable={false} title={op.name} value={op.name} >
                                        {
                                            op.member && op.member.map((subItem) => {
                                                return <TreeNode key={subItem.id} title={subItem.name} value={subItem.id} />
                                            })
                                        }
                                    </TreeNode>))
                            }
                        </TreeSelect>
                    </FormItemContainer>
                )
            case "date":
                return (
                    <FormItemContainer item={item}>
                        <DatePicker
                            disabled={item.disabled}
                            disabledDate={item.disabledDate}
                            //禁用到 今天：(current)=>{return current && current < moment().endOf('day')}
                            //禁用到 今天的前一天：(current)=>{return current && current < moment().subtract(1, 'days')}
                            onChange={(date, dateString) => {
                                this.json[item.keyName] = dateString;
                                item.onChange && item.onChange(date, dateString, this.formRef);
                            }}
                            placeholder={item.placeholder}
                            showTime={item.showTime || false} // item.showTime:{defaultValue: moment('00:00:00', 'HH:mm:ss'),format: 'HH:mm:ss'}
                            picker={item.picker||'date'} // picker:'date' 'week' 'month' 'quarter' 'year'
                            style={item.itemInputStyle}
                        />
                    </FormItemContainer>
                );
            case "dateRange":
                return (
                    <FormItemContainer item={item}>
                        <RangePicker
                            disabled={item.disabled}
                            disabledDate={item.disabledDate}
                            onChange={(date, dateString) => {
                                this.json[item.keyName] = dateString;
                                if(item.beginKeyName){
                                    this.json[item.beginKeyName] = dateString[0]
                                }
                                if(item.endKeyName){
                                    this.json[item.endKeyName] = dateString[1]
                                }
                                item.onChange && item.onChange(date, dateString, this.formRef);
                            }}
                            placeholder={item.placeholder || ["开始日期", "结束日期"]}
                            format={item.format ||  "YYYY-MM-DD"}
                            showTime={item.showTime || false} // showTime={{defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')], format: 'HH:mm:ss'}}
                            picker={item.picker||'date'} // picker:'date' 'week' 'month' 'year'
                            style={item.itemInputStyle}
                        />
                    </FormItemContainer>
                );
            case "custom":
                return (
                    <FormItemContainer item={item}>
                        { item.render(this.formRef) }
                    </FormItemContainer>
                );
            default:
                return null
        }
    }

    // 获取所有表单项
    getFields() {
        const {config} = this.props;
        const children = [];
        this.totalColSpan = 0;
        // 遍历配置列表
        for (let i = 0, len = config.length; i < len; i++) {
            const item = config[i];
            // totalColSpan用于计算折叠，仅留一行展示
            this.totalColSpan += item.colSpan?item.colSpan:4;
            children.push(this.getField(item));
        }
        return children;
    }

    render() {
        const {
            wrapFormClassName="",
            initialValues={},//如果与 FormItem 的 initialValue 冲突则以 Form 为准
            buttonConfig={
                span:4,
                showSearchBtn:true,
                showResetBtn:true,
                customChildren:(form)=>null,
                collapse:false,// 是否允许折叠
                collapsedShowRow: 1,// 折叠时展示几行
                defaultExpand: true,// 初始默认折叠状态：true:展开
                style:{},
            }
        } = this.props


        return (
            <Form
                className={`ant-advanced-search-form ${wrapFormClassName}`}
                layout="inline"
                initialValues={initialValues}
                onFinish={e => this.handleSearch(e)}
                ref={ins=>this.formRef=ins}
            >
                <Row gutter={0} justify={this.props.justify} type="flex" className="main">
                    {/* 获取表单内容 */}
                    {this.getFields()}
     
                    {/* 搜表表单按钮 */}
                    <Col span={4} className="btn-container" {...buttonConfig}>
                        {
                            buttonConfig.showSearchBtn ?
                                <Button htmlType="submit" type="primary">查询</Button> : null
                        }
                        {
                            buttonConfig.showResetBtn ?
                                <Button onClick={() => this.handleReset()} style={{marginLeft: 8}}>重置</Button> : null
                        }
                        {
                            buttonConfig.customChildren ? buttonConfig.customChildren(this.formRef) :null
                        }
                        {
                            buttonConfig.collapse ?
                                <span style={{marginLeft: 8, fontSize: 12}}>
                                    <a onClick={this.toggle} style={{whiteSpace: "nowrap"}}>
                                        {this.state.expand ? "收起" : "展开"}
                                        {this.state.expand ?<CaretUpOutlined />:<CaretDownOutlined />}
                                    </a> 
                                </span>: null
                        }
                    </Col>
                </Row>
            </Form>
        );
    }
}

