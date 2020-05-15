import React, { Component } from "react";
import CodeStatus from "../../../components/codeStatus.jsx"
import Doc from "../../../components/doc.jsx";
import { CheckTagGroup } from "cake-ui/src";

//组件属性
const propsConfig = [
    {
      key: "1",
      param: "defaultCheckedList",
      explain: "tag中默认选中的项",
      type: "object",
      defaultValue: "[]"
    },
    {
      key: "2",
      param: "onChange",
      explain: "点击tag执行的函数",
      type: "function",
      defaultValue: ""
    },
    {
      key: "3",
      param: "type",
      explain: "类型",
      type: "string",
      defaultValue: "checkbox"
    },
    {
      key: "4",
      param: "tags",
      explain: "tag选项",
      type: "[]",
      defaultValue: "详见下方tags配置"
    },
    {
      key: "5",
      param: "wrapClassName",
      explain: "添加额外的class",
      type: "string",
      defaultValue: ""
    },
    {
      key: "6",
      param: "tagClassName",
      explain: "元素tag的class",
      type: "string",
      defaultValue: ""
    }
];
/* tags配置 */
const tagsConfig = [
  {
    key: "1",
    param: "value",
    explain: "表单提交的时候tag里的值",
    type: "string",
    defaultValue: "text"
  },
  {
    key: "2",
    param: "label",
    explain: "表单的显示值",
    type: "string",
    defaultValue: ""
  },
  {
    key: "3",
    param: "withPoint",
    explain: "是否有红点",
    type: "boolean",
    defaultValue: "false"
  },
  {
    key: "4",
    param: "disabled",
    explain: "是否可用",
    type: "boolean",
    defaultValue: "false"
  }
];

export default class CheckTagGroupTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedTags:[2,3],//当前选中tag
        };
    }

    render() {
        const tags = [
          {value:1,label:"苹果",withPoint:true},
          {value:2,label:"香蕉",},
          {value:2,label:"菠萝",},
          {value:3,label:"橘子",},
          {value:4,label:"柠檬",disabled:true}
        ]

        return (
            <div>
                <h2>CheckTagGroup 示例：</h2>

                <CheckTagGroup
                    defaultCheckedList={this.state.checkedTags}
                    onChange={(checkedList,checkedTags) => {
                        console.log('checkedList：',checkedList,'checkedTags：',checkedTags)
                        this.setState({checkedTags:checkedList})
                    }}
                    tags={this.state.tags}
                    // type="radio"
                />

              <CodeStatus>{`
import { CheckTagGroup } from "cake-ui"
             
const tags=${JSON.stringify(tags, null, 2)}

<CheckTagGroup
    defaultCheckedList={this.state.checkedTags}
    onChange={(checkedList,checkedTags) => {
        console.log('checkedList：',checkedList,'checkedTags：',checkedTags)
        this.setState({checkedTags:checkedList})
    }}
    tags={this.state.tags}
    // type="radio"
/>
            `}</CodeStatus>
                
                {/* 参数说明 */}
                <h2>组件属性</h2>
                <Doc dataList={propsConfig} />

                <h2>tags配置</h2>
                <Doc dataList={tagsConfig} />
            </div>
        )
    }
}

