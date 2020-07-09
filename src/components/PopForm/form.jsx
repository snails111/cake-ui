import React from "react";
import {Form, Input, InputNumber, Select, Radio, Checkbox, DatePicker, Button} from "antd";
import { CaretDownOutlined } from '@ant-design/icons';
import MyUpload from "./upload";
import PropTypes from 'prop-types';

const FormItem = Form.Item;
const {Option} = Select;
const {TextArea, Search} = Input;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const {RangePicker} = DatePicker;

/*
 * SearchForm 表单
 * author：徐静
 * date：2020.05.08
 * */
export default class MyForm extends React.Component {
    static propTypes = {
        formLayout: PropTypes.string,
        formItemLayout: PropTypes.object,
        hideRequiredMark: PropTypes.bool,
        initialValues: PropTypes.object,

        buttonConfig: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.bool
        ]),

        itemList: PropTypes.array,
        itemStyle: PropTypes.object,
        okText: PropTypes.string,
        cancelText: PropTypes.string,
        onOk: PropTypes.func,
        onCancel: PropTypes.func,
    };
    static defaultProps = {
        formLayout: "horizontal", // horizontal、vertical、inline、double
        formItemLayout: {labelCol: {span: 3}, wrapperCol: {span: 21}},
        hideRequiredMark: false,//隐藏所有表单项的必选标记
        initialValues:{},//如果与 FormItem 的 initialValue 冲突则以 Form 为准
        
        buttonConfig:{ // 若为false则该表单没有按钮
            showCancelBtn:true, //是否显示取消按钮
            showOkBtn:true, //是否显示确定按钮
            beforeCustomChildren:()=>null,//确定按钮之前的自定义按钮
            afterCustomChildren:()=>null,//确定按钮之后的自定义按钮
            style:{},//可控制按钮居中、右对齐（ justify-content: flex-end;）
        },

        itemList: [],
        itemStyle: {},
        okText: "确定",
        cancelText: "取消",
        onOk: ()=>{}, // 提交表单执行回调
        onCancel: ()=>{}, // 取消表单执行回调
    };

    constructor(props) {
        super(props);
        this.state = {
            // 验证码
            seconds: 60,
            tipTxt: "点击发送"
        }
        this.formRef=null
        this.formItemBox = null
    }

    /* 设置内容高度 */
    resizeHeight = () => {
        if (this.formItemBox) {
            try{
                const formItemBox = this.formItemBox.current;
                if(!formItemBox) return;
                const documentHeight =
                    document.documentElement.clientHeight || document.body.clientHeight;
                const formItemBoxHeight = formItemBox.offsetHeight;
                const formItemBoxScrollHeight = formItemBox.scrollHeight;
                if (
                    formItemBoxHeight + 200 > documentHeight ||
                    formItemBoxScrollHeight > formItemBoxHeight
                ) {
                    formItemBox.style.maxHeight = `${document.documentElement.clientHeight - 220}px`;
                } else if (formItemBoxScrollHeight <= formItemBoxHeight) {
                    formItemBox.style.maxHeight = `${formItemBoxScrollHeight}px`;
                }
            }catch (e) {
                console.log("重置高度异常：",e)
            }
        }
    }

    handleSubmit = (values,customFun) => {
        // 调用父组件
        if (customFun) {
            customFun({...values});
        } else {
            this.props.onOk({...values});
        }
    }
    /* 返回对应的roles 主要返回了form表单对象，方便做联动校验 */
    returnRoles = (rules) => {
        const newRules = [];
        if (rules) {
            rules.map((item) => {
                const obj = { ...item }
                if (item.validator) {
                    obj.validator = (rule, value, callback) => item.validator(rule, value, callback, this.props.form);
                    newRules.push({...obj})
                }else{
                    newRules.push({...item});
                }
                return false
            })
        }
        return newRules
    }

    // 获取某一表单项
    getField = (item) => {
        switch (item.type) {
            case "text":
                return (
                    <Input
                        {...item} //由于input有很多衍生属性：例如 addonAfter
                        disabled={item.disabled}
                        onChange={e => {
                            item.onChange&&item.onChange(e, this.formRef);
                        }}
                        placeholder={item.placeholder}
                        style={item.itemInputStyle}
                    />
                )
            case "number":
                return (
                    <InputNumber
                        disabled={item.disabled}
                        max={item.max ? item.max : Infinity}
                        min={item.min ? item.min : -Infinity}
                        onChange={value => {
                            item.onChange&&item.onChange(value, this.formRef);
                        }}
                        placeholder={item.placeholder}
                        style={item.itemInputStyle}
                    />
                )
            case "password":
                return (
                    <Input
                        type="password"
                        autoComplete="new-password"
                        disabled={item.disabled}
                        onChange={e => {
                            item.onChange&&item.onChange(e, this.formRef);
                        }}
                        placeholder={item.placeholder}
                        style={item.itemInputStyle}
                    />
                )
            /* 发送验证码 */
            case "verify":
                return (
                    <Search
                        className="verify"
                        disabled={false}
                        enterButton={this.state.tipTxt}
                        onSearch={(value, e) => {
                            const btn = e.target;
                            if (e.target.tagName === "BUTTON") {
                                item.onSearch&&item.onSearch(value,this.formRef, () => {
                                    // (发送验证码)请求成功回调
                                    btn.disabled = true; // 禁用按钮
                                    btn.classname = "disabled";
                                    // 显示60s倒计时
                                    this.setState({
                                        seconds: 60,
                                        tipTxt: `60s`
                                    })
                                    const timer = setInterval(() => {
                                        this.setState(
                                            preState => ({
                                                seconds: preState.seconds - 1,
                                                tipTxt: `${this.state.seconds - 1}s`
                                            }),() => {
                                                if (this.state.seconds < 0) {
                                                    btn.disabled = false; // 恢复按钮
                                                    btn.classname = "";
                                                    clearInterval(timer);
                                                    this.setState({
                                                        seconds: 60,
                                                        tipTxt: "点击发送"
                                                    });
                                                }
                                            }
                                        );
                                    }, 1000);
                                });
                            }
                        }}
                        placeholder={item.placeholder}
                        style={item.itemInputStyle}
                    />
                )
            case "textarea":
                return (
                    <TextArea
                        autosize={{minRows: item.rows || 2, maxRows: 6}}
                        disabled={item.disabled}
                        onChange={e => {
                            item.onChange&&item.onChange(e, this.formRef);
                        }}
                        rows={item.rows}
                        placeholder={item.placeholder}
                        style={item.itemInputStyle}
                    />
                )
            /* 单选框 */
            case "radio":
                return (
                    <RadioGroup
                        buttonStyle="outline"
                        onChange={e => {
                            item.onChange&&item.onChange(e, this.formRef);
                        }}
                        style={item.itemInputStyle}
                    >
                        {item.options&&item.options.map(op => (
                            <Radio key={op.value} disabled={item.disabled} value={op.value}>{op.label}</Radio>
                        ))}
                    </RadioGroup>
                )
            /* 复选框 */
            case "checkbox":
                return (
                    <CheckboxGroup
                        disabled={item.disabled}
                        onChange={e => {
                            item.onChange&&item.onChange(e, this.formRef);
                        }}
                        options={item.options}
                        style={item.itemInputStyle}
                    />
                )
            /* 下拉框 */
            case "select":
                return (
                    <Select
                        suffixIcon={<CaretDownOutlined />}
                        disabled={item.disabled}
                        notFoundContent="无"
                        onChange={(value, option) => {
                            item.onChange&&item.onChange(value, option, this.formRef);
                        }}
                        placeholder={item.placeholder}
                        style={item.itemInputStyle}
                    >
                        {item.options&&item.options.map(op => <Option key={op.value} value={op.value}>{op.label}</Option>)}
                    </Select>
                );
            /* 日期 */
            case "date": // 注：提交方法传出的date值是moment格式
                return (
                    <DatePicker
                        disabled={item.disabled}
                        disabledDate={item.disabledDate}
                        //禁用到 今天：(current)=>{return current && current < moment().endOf('day')}
                        //禁用到 今天的前一天：(current)=>{return current && current < moment().subtract(1, 'days')}
                        onChange={(date, dateString) => {
                            item.onChange&&item.onChange(date, dateString, this.formRef);
                        }}
                        placeholder={item.placeholder}
                        showTime={item.showTime ? item.showTime : false} // item.showTime:{defaultValue: moment('00:00:00', 'HH:mm:ss'),format: 'HH:mm:ss'}
                        picker={item.picker||'date'} // picker:'date' 'week' 'month' 'quarter' 'year'
                        // mode={item.mode||'date'} // mode:'time' 'date' 'month' 'year' 'decade'
                        style={item.itemInputStyle}
                    />
                );
            /* 时间范围 */
            case "dateRange":
                return (
                    <RangePicker
                        disabled={item.disabled}
                        disabledDate={item.disabledDate}
                        onChange={(date, dateString) => {
                            item.onChange&&item.onChange(date, dateString, this.formRef);
                        }}
                        placeholder={item.placeholder || ["开始日期", "结束日期"]}
                        format={item.format || "YYYY-MM-DD"}
                        showTime={item.showTime || false} // showTime={{defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')], format: 'HH:mm:ss'}}
                        picker={item.picker||'date'} // picker:'date' 'week' 'month' 'year'
                        // mode={item.mode||['date','date']} // mode:'time' 'date' 'month' 'year' 'decade'
                        style={{width: "100%", ...item.itemInputStyle}}
                    />
                );
            /* 上传文件 */
            case "file":
                return (
                    <MyUpload {...item} form={this.formRef} />
                );
            // 自定义组件
            case "custom":
                return (
                    item.render(this.formRef)
                );
            default:
                return null;
        }
    }

    render() {
        const {
            formLayout = "horizontal", // horizontal、vertical、inline、double
            formItemLayout = {labelCol: {span: 3}, wrapperCol: {span: 21}},
            hideRequiredMark = false,//隐藏所有表单项的必选标记
            initialValues={},//如果与 FormItem 的 initialValue 冲突则以 Form 为准
            
            buttonConfig={ // 若为false则该表单没有按钮
                showCancelBtn:true, //是否显示取消按钮
                showOkBtn:true, //是否显示确定按钮
                beforeCustomChildren:()=>null,//确定按钮之前的自定义按钮
                afterCustomChildren:()=>null,//确定按钮之后的自定义按钮
                style:{}, //可控制按钮居中、右对齐（ justify-content: flex-end;）
            },

            itemList = [],
            itemStyle = {},
            okText= "确定",
            cancelText= "取消",
            onOk = ()=>{}, // 提交表单执行回调
            onCancel = ()=>{}, // 取消表单执行回调
        } = this.props; 


        return (
            <Form
                layout={formLayout}
                initialValues={initialValues}
                hideRequiredMark={hideRequiredMark}
                onFinish={e => this.handleSubmit(e)}
                ref={ins=>this.formRef=ins}
            >
                {/* 表单内容 */}
                <div className={`form-item-box ${formLayout==="double"?"double-layout":""}`} ref={ins=>this.formItemBox=ins}>
                    {
                        itemList.map((item) => {
                            let display = "flex";
                            if (item.visible === false) {
                                display = "none";
                            } else if (formLayout === "inline") {
                                display = "inline-block";
                            }else if(formLayout === "double"||formLayout === "vertical"){
                                display = "flex";
                            }
                            return (
                                <FormItem
                                    {...item}
                                    {...formItemLayout}
                                    {...item.formItemLayout}
                                    key={item.keyName} // label 标签的文本
                                    hasFeedback={item.hasFeedback !== false}
                                    label={item.name}
                                    name={item.keyName}
                                    rules={item.rules ? item.rules : []}
                                    initialValue={item.defaultValue ? item.defaultValue : ""}//如果与 Form 的 initialValues 冲突则以 Form 为准
                                    style={{
                                        display,
                                        ...itemStyle,
                                        ...item.itemStyle
                                    }}
                                >
                                    {this.getField(item)}
                                </FormItem>
                            )
                        })
                    }
                </div>

                {/* 表单按钮 */}
                <div className="action-button-container" {...buttonConfig}>
                    {
                        buttonConfig&&buttonConfig.beforeCustomChildren ? buttonConfig.beforeCustomChildren() :null
                    }
                    {
                        buttonConfig&&buttonConfig.showCancelBtn ?
                            <Button onClick={() => onCancel&&onCancel()} >{cancelText||"取消"}</Button> : null
                    }
                    {
                        buttonConfig&&buttonConfig.showOkBtn ?
                            <Button htmlType="submit" type="primary" style={{marginLeft: 16}}>{okText||"确定"}</Button> : null
                    }
                    {
                        buttonConfig&&buttonConfig.afterCustomChildren ? buttonConfig.afterCustomChildren() :null
                    }
                </div>
            </Form>
        )
    }
}
