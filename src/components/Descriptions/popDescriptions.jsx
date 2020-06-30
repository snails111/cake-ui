import React,{Component} from "react";
import {Modal} from "antd";
import PropTypes from "prop-types"; 
import {Button} from "antd"
import DetailDescriptions from "./descriptions"

/**
 * 弹出框详情组件.
 * User: 徐静
 * Date: 2020/6/30
 */
export default class PopDetailDescriptions extends Component {
    static propTypes = {
        modalVisible: PropTypes.bool,
        initData: PropTypes.shape({
            title: PropTypes.string,
            modalWidth: PropTypes.number,
            closable: PropTypes.bool,
            maskClosable:  PropTypes.bool,
            destroyOnClose:  PropTypes.bool,

            detailTitle: PropTypes.string,
            items: PropTypes.array,
            data: PropTypes.object,
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

            detailTitle: '',
            items: [],
            data: {},
            onCancel: ()=>{}, 
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
            detailTitle= '',
            modalWidth= 560, // 弹框宽度
            closable= true, // 是否显示右上角的关闭按钮
            maskClosable= false, // 点击蒙层是否允许关闭
            destroyOnClose= true, // 关闭时销毁 Modal 里的子元素

            buttonConfig={
                style:{},//可控制按钮居中、右对齐（ justify-content: flex-end;）
            },

            items = [],
            data = {},
            onCancel = ()=>{}, 
        } = this.props.initData;


        return (
            <div className="modal-pupModal">
                <Modal
                    {...this.props.initData} 
                    title={title}
                    visible={this.state.modalVisible}
                    className={`pop-descriptions-modal ${this.props.className}`}
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
                    <DetailDescriptions 
                        {...this.props.initData} 
                        className={`pop-descriptions-content ${this.props.initData.className}`}
                        items={items} 
                        data={data} 
                        title={detailTitle}
                    />

                     {/* 按钮 */}
                     {
                        buttonConfig?
                            <div 
                                {...buttonConfig} 
                                className={`descriptions-action-button-container ${buttonConfig.className}` }
                            >
                                <Button type="primary" onClick={()=>{onCancel()}}>知道啦</Button>
                            </div> : null
                     }
                </Modal>
            </div>
        );
    }
}
