import React,{Component} from "react";
import {Modal} from "antd";
import PropTypes from "prop-types"; 
import MyForm from "./form";


/**
 * 弹出框表单组件.
 * User: 王洪瑞/3153981409@qq.com
 * Date: 2019/2/18
 * Time: 16:12
 */
class PopForm extends Component {
    static propTypes = {
        modalVisible: PropTypes.bool,
        initData: PropTypes.shape({
            title: PropTypes.string,
            modalWidth: PropTypes.number,
            closable: PropTypes.bool,
            maskClosable:  PropTypes.bool,
            destroyOnClose:  PropTypes.bool,

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
        }),
        children: PropTypes.node,
        className: PropTypes.string,
        getContainer: PropTypes.func,
    };
    static defaultProps = {
        modalVisible: false,
        initData:{
            title: '',
            modalWidth: 560, // 弹框宽度
            closable: true, // 是否显示右上角的关闭按钮
            maskClosable: false, // 点击蒙层是否允许关闭
            destroyOnClose: true, // 关闭时销毁 Modal 里的子元素

            formLayout: "horizontal", // horizontal、vertical、inline、double
            formItemLayout: {labelCol: {span: 3}, wrapperCol: {span: 21}},
            hideRequiredMark: false,//隐藏所有表单项的必选标记
            initialValues:{},//如果与 FormItem 的 initialValue 冲突则以 Form 为准
            
            buttonConfig:{ // 若为false则该表单没有按钮
                showCancelBtn:true, //是否显示取消按钮
                showOkBtn:true, //是否显示确定按钮
                beforeCustomChildren:()=>null,//确定按钮之前的自定义按钮
                afterCustomChildren:()=>null,//确定按钮之后的自定义按钮
                style:{},
            },
    
            itemList: [],
            itemStyle: {},
            okText: "确定",
            cancelText: "取消",
            onOk: ()=>{}, // 提交表单执行回调
            onCancel: ()=>{}, // 取消表单执行回调
        },
        children: [],
        className: '',
        getContainer: ()=>document.body, //指定 Modal 挂载的 HTML 节点, false 为挂载在当前 dom
    };

    constructor(props) {
        super(props);
        this.state = {
            // 弹出框显示/隐藏
            modalVisible: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.modalVisible !== nextProps.modalVisible) {
            // 显示Modal
            this.setState({
                modalVisible: nextProps.modalVisible
            })
        }
    }


    render() {
        const {
            title= '',
            modalWidth= 560, // 弹框宽度
            closable= true, // 是否显示右上角的关闭按钮
            maskClosable= false, // 点击蒙层是否允许关闭
            destroyOnClose= true, // 关闭时销毁 Modal 里的子元素

            formLayout = "horizontal", // horizontal、vertical、inline、double
            formItemLayout = {labelCol: {span: 3}, wrapperCol: {span: 21}},
            hideRequiredMark = false,//隐藏所有表单项的必选标记
            initialValues={},//如果与 FormItem 的 initialValue 冲突则以 Form 为准
            
            buttonConfig={ // 若为false则该表单没有按钮
                showCancelBtn:true, //是否显示取消按钮
                showOkBtn:true, //是否显示确定按钮
                beforeCustomChildren:()=>null,//确定按钮之前的自定义按钮
                afterCustomChildren:()=>null,//确定按钮之后的自定义按钮
                style:{},
            },

            itemList = [],
            itemStyle = {},
            okText= "确定",
            cancelText= "取消",
            onOk = ()=>{}, // 提交表单执行回调
            onCancel = ()=>{}, // 取消表单执行回调
        } = this.props.initData;


        return (
            <div className="modal-pupModal">
                <Modal
                    {...this.props} 
                    title={title}
                    visible={this.state.modalVisible}
                    className={`pop-form-modal ${this.props.className}`}
                    width={modalWidth}
                    centered
                    footer={null}
                    closable={closable}
                    maskClosable={maskClosable}
                    destroyOnClose={destroyOnClose}
                    onCancel={() => {onCancel()}}
                    getContainer={this.props.getContainer}
                    ref={(ins) => { this.modalInstance = ins }}
                >
                    <div className="pop-form-custom-text">
                        {this.props.children}
                    </div>
                    <MyForm
                        {...this.props.initData}
                        buttonConfig={{
                            className:"action-button-container pop-action-button-container",
                            ...buttonConfig,
                        }}
                        ref={(form) => (this.myform = form)}
                    />
                </Modal>
            </div>

        );
    }
}

export default PopForm;
