import React from "react";
import CodeStatus from "../../../components/codeStatus.jsx";
import Doc from "../../../components/doc.jsx";
import { Tree } from "antd";
const { TreeNode } = Tree;

//组件属性
const propsConfig = [
    {
      key: "treeData",
      param: "treeData",
      explain: "treeNodes 数据（key 必须在整个树范围内唯一）",
      type: "array",
      defaultValue: "[]",
    },
    {
      key: "autoExpandParent",
      param: "autoExpandParent",
      explain: "是否自动展开根节点",
      type: "boolean",
      defaultValue: "true",
    },
    {
      key: "defaultExpandAll",
      param: "defaultExpandAll",
      explain: "默认展开所有树节点",
      type: "boolean",
      defaultValue: "false",
    },
    {
      key: "defaultExpandedKeys",
      param: "defaultExpandedKeys",
      explain: "默认展开指定的树节点",
      type: "array",
      defaultValue: "[]",
    },
    {
      key: "expandedKeys",
      param: "expandedKeys",
      explain: "（受控）展开指定的树节点",
      type: "array",
      defaultValue: "[]",
    },

    {
      key: "selectable",
      param: "selectable",
      explain: "是否可选中",
      type: "boolean",
      defaultValue: "true",
    },
    {
      key: "selectedKeys",
      param: "selectedKeys",
      explain: "（受控）设置选中的树节点",
      type: "array",
      defaultValue: "[]",
    },
    {
      key: "defaultSelectedKeys",
      param: "defaultSelectedKeys",
      explain: "默认选中的树节点",
      type: "array",
      defaultValue: "[]",
    },
    
    {
      key: "disabled",
      param: "disabled",
      explain: "是否禁用",
      type: "boolean",
      defaultValue: "false",
    },
    {
      key: "checkable",
      param: "checkable",
      explain: "添加 Checkbox 复选框",
      type: "boolean",
      defaultValue: "false",
    },
    {
      key: "checkedKeys",
      param: "checkedKeys",
      explain: "（受控）选中复选框的树节点",
      type: "array",
      defaultValue: "[]",
    },
    {
      key: "defaultCheckedKeys",
      param: "defaultCheckedKeys",
      explain: "默认选中复选框的树节点",
      type: "array",
      defaultValue: "[]",
    },
    {
      key: "onCheck",
      param: "onCheck",
      explain: "点击复选框触发",
      type: "function",
      defaultValue: "(checkedKeys, e)=>{}",
    },
    {
      key: "onExpand",
      param: "onExpand",
      explain: "展开/收起节点时触发",
      type: "function",
      defaultValue: "(expandedKeys)=>{}",
    },
    {
      key: "onSelect",
      param: "onSelect",
      explain: "点击树节点触发",
      type: "function",
      defaultValue: "(selectedKeys, e)=>{}",
    },
    {
      key: "multiple",
      param: "multiple",
      explain: "支持点选多个节点（节点本身）",
      type: "boolean",
      defaultValue: "false",
    },
    {
      key: "showIcon",
      param: "showIcon",
      explain: "是否展示 TreeNode title 前的图标，配合TreeNode 的icon属性",
      type: "boolean",
      defaultValue: "false",
    },
    {
      key: "switcherIcon",
      param: "switcherIcon",
      explain: "自定义树节点的展开/折叠图标",
      type: "ReactNode",
      defaultValue: "",
    },
    {
      key: "showLine",
      param: "showLine",
      explain: "是否展示连接线",
      type: "boolean",
      defaultValue: "false",
    },
]
// TreeNode 配置
const treeNodeConfig=[
  {
    key: "key",
    param: "key",
    explain: "唯一key",
    type: "string",
    defaultValue: "",
  },
  {
    key: "title",
    param: "title",
    explain: "标题",
    type: "string|ReactNode",
    defaultValue: "'---'",
  },
  {
    key: "selectable",
    param: "selectable",
    explain: "节点是否可被选中",
    type: "boolean",
    defaultValue: "true",
  },
  {
    key: "checkable",
    param: "checkable",
    explain: "当树为 checkable 时，设置独立节点是否展示 Checkbox",
    type: "boolean",
    defaultValue: "",
  },
  {
    key: "disableCheckbox",
    param: "disableCheckbox",
    explain: "禁掉 checkbox",
    type: "boolean",
    defaultValue: "false",
  },
  {
    key: "disabled",
    param: "disabled",
    explain: "禁掉所有响应",
    type: "boolean",
    defaultValue: "false",
  },
  {
    key: "icon",
    param: "icon",
    explain: "自定义图标，配合组件的showIcon 属性",
    type: "ReactNode",
    defaultValue: "",
  },
]


const treeData1 = [
    {
      title: '一级',
      key: '1',
      children: [
        {
          title: '二级01',
          key: '11',
          children: [
            {title: '三级01',key: '111'},
            {title: '三级02',key: '112'},
          ],
        },
        {
          title: '二级02',
          key: '12',
          children: [
              { title: "三级sss", key: '121' },
              { title: "三级ddd", key: '122' },
          ],
        },
        {
          title: '二级03',
          key: '13',
          children: [
              { title: "三级耶耶耶", key: '131' },
          ],
        },
      ],
    },
];
const treeData2 = [
    {
      title: '一级',
      key: '1',
      children: [
        {
          title: '二级01',
          key: '11',
          disabled: true,
          children: [
            {title: '三级01',key: '111',disableCheckbox: true,},
            {title: '三级02',key: '112'},
          ],
        },
        {
          title: '二级02',
          key: '12',
          children: [
              { title: "三级sss", key: '121' },
              { title: "三级ddd", key: '122' },
          ],
        },
        {
          title: '二级03',
          key: '13',
          children: [
              { title: "三级耶耶耶", key: '131' },
          ],
        },
      ],
    },
];
/*
 * Tree 树形控件示例
 * author：徐静
 * date：2020.05.09
 * */
export default class TreeDemo extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };
    
    onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
    };
   
    render() {
        

        return (
            <div>
                <h2>树形控件 示例</h2>

                <div style={{display:"flex",justifyContent:"space-between"}}>
                    {/* 简单版 */}
                    <div style={{width:"48%"}}>
                        <Tree
                            defaultExpandedKeys={['1', '11', '12']}
                            onSelect={this.onSelect}
                            treeData={treeData1}
                        />

                        <CodeStatus>{`
import { Tree } from "antd"

const treeData=${JSON.stringify(treeData1, null, 2)}

<Tree
    defaultExpandedKeys={['1', '11', '12']}
    onSelect={this.onSelect}
    treeData={treeData}
/>
                        `}</CodeStatus>

                    </div>

                    {/* 复杂版 */}
                    <div style={{width:"48%"}}>
                        <Tree
                            checkable
                            defaultExpandedKeys={['1', '11', '12']}
                            defaultSelectedKeys={['1']}
                            defaultCheckedKeys={['121', '122']}
                            onSelect={this.onSelect}
                            onCheck={this.onCheck}
                            treeData={treeData2}
                        />

                        <CodeStatus>{`
import { Tree } from "antd"

const treeData=${JSON.stringify(treeData2, null, 2)}

<Tree
    checkable
    defaultExpandedKeys={['1', '11', '12']}
    defaultSelectedKeys={['1']}
    defaultCheckedKeys={['121', '122']}
    onSelect={this.onSelect}
    onCheck={this.onCheck}
    treeData={treeData}
/>
                        `}</CodeStatus>
                    </div>

                </div>
                
                {/* 参数说明 */}
                <h2>组件属性</h2>
                <Doc dataList={propsConfig} />
                <h2>TreeNode 配置</h2>
                <Doc dataList={treeNodeConfig} />

            </div>
        )
    }
}

