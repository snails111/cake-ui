import React from "react";
import { Descriptions,Tooltip } from "antd";
import PropTypes from 'prop-types';


/*
 * SearchForm 描述详情
 * author：徐静
 * date：2020.06.29
 * */
export default class DetailDescriptions extends React.Component {
    static propTypes = {
        title: PropTypes.node,
        bordered: PropTypes.bool,
        ellipsis: PropTypes.bool,
        column: PropTypes.number,
        size: PropTypes.string,
        layout: PropTypes.string,
        items: PropTypes.array,
        data: PropTypes.object,
    };
    static defaultProps = {
        title: "",
        bordered: false,
        ellipsis: false, //所有项单行省略
        column: 2, //默认两列
        size: "",
        layout: "horizontal", //horizontal（默认） | vertical
        items: [],
        data: {},
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {
            ellipsis=false,
            items=[ // 详情每一项配置
                { key: "name", label: "任务名称", span:2,  ellipsis: true },
            ],
            data={}, //详情数据
        } = this.props;

        return (
            <Descriptions 
                {...this.props}
                className={`detail-layout ${this.props.className}`}
            >
                {
                    items.map(info=>{
                        const value = info.value || data[info.key] 

                        return (
                            <Descriptions.Item 
                                label={info.label} 
                                span={info.span} 
                            >
                                {
                                    (ellipsis&&info.ellipsis!==false) || info.ellipsis?
                                    <span  className="descriptions-ellipsis">
                                        <Tooltip  title={value} placement="topLeft"><span>{value}</span></Tooltip>
                                    </span> : value
                                }
                            </Descriptions.Item>
                        )
                    })
                }
            </Descriptions>
        )
    }
}
