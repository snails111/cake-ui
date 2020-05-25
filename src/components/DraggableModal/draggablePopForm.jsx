import React from "react";
import { Modal } from "antd";
import PropTypes from "prop-types";
import MyForm from "../PopForm/form.jsx";

/*
* js生成uuid 唯一标志符
* */
const uuid=()=> {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

/*
 * 可拖动的弹框 组件
 * author：徐静
 * date：2019.02.14
 * */
export default class DraggableFormModal extends React.Component {
    static propTypes = {
        top: PropTypes.number,
        modalVisible: PropTypes.bool,
       
        // 表单的配置
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
        afterCloseToInitPosition: PropTypes.bool, // 拖动弹框关闭后是否回归初始位置
        getContainer: PropTypes.func,
    };

    static defaultProps = {
        top:100,
        modalVisible:false,
        initData:{
            title: '',
            modalWidth: 560, // 弹框宽度
            closable: true, // 是否显示右上角的关闭按钮
            maskClosable: false, // 点击蒙层是否允许关闭
            destroyOnClose: true, // 关闭时销毁 Modal 里的子元素

            formLayout: "horizontal", // horizontal、vertical、inline、double
            formItemLayout: {labelCol: {span: 3}, wrapperCol: {span: 20}},
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
        className: "",
        afterCloseToInitPosition:true, //关闭后回到初始位置
        getContainer: ()=>document.body,
    };

    constructor(props) {
        super(props);
        // 表单
        this.state = {
            // 弹出框显示/隐藏
            modalVisible: false,
        };
        this.id = uuid(); // 获得随机id
        this.initLeft = (window.innerWidth - (this.props.width)) / 2; // 初始化水平位置调整
        this.initTop = this.props.top ; // 初始化垂直位置调整
        this.dragDom = null; // 拖拽的目标元素
        this.dragging = false; // 是否拖拽的开关
        this.tLeft = 0; // ---| 坐标轴x
        this.tTop = 0; //  ------> 坐标轴y
    }

    componentDidMount() {
        // 初始化dragDom初始位置
        this.getDragDom();
    }

    componentDidUpdate() {
        // 若dragDom不存在，初始化dragDom初始位置
        if (!this.dragDom) {
            this.getDragDom();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.modalVisible) {
            this.dragging = false; // 停止移动状态
            document.onmousemove = null; // 停止鼠标移动事件
        }

        if (this.props.modalVisible !== nextProps.modalVisible) {
            // 显示Modal
            this.setState({
                modalVisible: nextProps.modalVisible
            })
        }
    }

    /*
     * 初始渲染时，直接获取 Modal 的 dom 会获取不到。
     * 设置 ref 使用 findDOMNode 也获取不到。
     * 只能在定时器中使用原生方式来获取。
     * */
    getDragDom = () => {
        setTimeout(() => {
            // 获取唯一标示元素
            const dragDom = document.getElementsByClassName(`d_${this.id}`)[0];
            if (dragDom) {
                dragDom.style.left = `${this.initLeft}px`;
                dragDom.style.top = `${this.initTop}px`;
                this.dragDom = dragDom;
            }
        });
    };

    onMouseDown = e => {
        e.preventDefault();
        this.dragging = true; // 激活拖拽状态
        /*
         ** 实现点击后，当前浮层在最上面
         ** 将当前所有涉及可拖拽的浮层的 zindex = 1000
         ** 将当前拖拽目标的 zindex = 1001
         * */
        const nodeList = document.getElementsByClassName("drag_modal");
        if (nodeList.length > 0) {
            Array.from(nodeList).forEach(item => (item.style.zIndex = 1000));
            this.dragDom.style.zIndex = 1001;
        }

        /*
         * getBoundingClientRect: 返回一个 DomRect 对象
         *   包含该元素的 top、right、bottom、left 值，对应的是到屏幕上方和左边的距离，单位 px
         * */
        const dragDomRect = this.dragDom.getBoundingClientRect();
        /*
         * e.clientX、e.clientY
         *   获取鼠标的坐标位置
         * */
        this.tLeft = e.clientX - dragDomRect.left; // 鼠标按下时和选中元素的坐标偏移:x坐标
        this.tTop = e.clientY - dragDomRect.top; // 鼠标按下时和选中元素的坐标偏移:y坐标

        this.onMouseMove(this.dragDom);
    };

    onMouseUp = e => {
        e.preventDefault();
        this.dragging = false; // 停止移动状态
        document.onmousemove = null; // 停止鼠标移动事件
    };

    onMouseMove = node => {
        document.onmousemove = e => {
            e.preventDefault();
            if (this.dragging) {
                node.style.left = `${e.clientX - this.tLeft}px`;
                node.style.top = `${e.clientY - this.tTop}px`;
            }
        };
        document.onmouseup = e => {
            e.preventDefault();
            this.dragging = false; // 停止移动状态
            document.onmousemove = null; // 停止鼠标移动事件
        };
    };

    render() {
        //表单
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
            <Modal
                {...this.props}
                afterClose={()=>{this.props.afterCloseToInitPosition&&this.getDragDom()}}
                keyboard={false}
                title={
                    <div
                        className="drag_title"
                        onMouseDown={this.onMouseDown}
                        onMouseUp={this.onMouseUp}
                        style={{cursor:"move"}}
                    >
                        {title}
                    </div>
                }
                visible={this.props.modalVisible}
                width={modalWidth}
                centered
                footer={null}
                closable={closable}
                maskClosable={maskClosable}
                destroyOnClose={destroyOnClose}
                onCancel={() => {onCancel()}}
                getContainer={this.props.getContainer}
                ref={(ins) => { this.modalInstance = ins }}
                wrapClassName={`drag_modal_wrap d_${this.id} pop-form-modal ${this.props.className}`}
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
        );
    }
}
