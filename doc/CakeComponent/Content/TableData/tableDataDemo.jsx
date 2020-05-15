import React, { Component } from "react";
import CodeStatus from "../../../components/codeStatus.jsx"
import Doc from "../../../components/doc.jsx";
import { TableData } from "cake-ui/src";
import { message, Modal,Badge,Space  } from "antd";

//组件属性
const propsConfig = [
    {
      key: "columns",
      param: "columns",
      explain: "表格的表头信息，用getInitialTableHead方法返回，必传",
      type: "object",
      defaultValue: "text"
    },
    {
      key: "dataSource",
      param: "dataSource",
      explain: "表格的列数据，必传",
      type: "function",
      defaultValue: ""
    },
    {
      key: "queryData",
      param: "queryData",
      explain: "请求表格的列数据，必传",
      type: "function",
      defaultValue: ""
    },
    {
      key: "intervalColor",
      param: "intervalColor",
      explain: "隔行变色",
      type: "boolean",
      defaultValue: "false"
    },
    {
      key: "bordered",
      param: "bordered",
      explain: "有无边框, 不传默认无边框",
      type: "boolean",
      defaultValue: "false"
    },
    {
      key: "borderedOut",
      param: "borderedOut",
      explain: "有无最外层边框, 不传默认无边框",
      type: "boolean",
      defaultValue: "false"
    },
    {
      key: "loading",
      param: "loading",
      explain: "是否等待",
      type: "boolean",
      defaultValue: "false"
    },
    {
      key: "rowKey",
      param: "rowKey",
      explain: "行id",
      type: "function",
      defaultValue: "record => record.id"
    },
    {
      key: "size",
      param: "size",
      explain: "表格的高度和字体大小, small详细查看antd",
      type: "string",
      defaultValue: "default"
    },
    {
      key: "rowSelection",
      param: "rowSelection",
      explain: "表格行是否可选择,详细查看antd",
      type: "object",
      defaultValue: "default"
    },
    {
      key: "pagingSize",
      param: "pagingSize",
      explain: "当为「small」时，是小尺寸分页",
      type: "string",
      defaultValue: "default"
    },
    {
      key: "scroll",
      param: "scroll",
      explain: "是否滚动",
      type: "boolean",
      defaultValue: "false"
    },
    {
      key: "12",
      param: "onRow",
      explain: "设置行属性, 详细查看antd",
      type: "function",
      defaultValue: ""
    },
    {
      key: "rowClassName",
      param: "rowClassName",
      explain: "表格行的类名",
      type: "string",
      defaultValue: ""
    },
    {
      key: "components",
      param: "components",
      explain: "基本不用，详细查看antd",
      type: "string",
      defaultValue: ""
    },
    {
      key: "position",
      param: "position",
      explain: "指定分页显示的位置",
      type: "string",
      defaultValue: "bottom"
    },
    {
      key: "pageSizeOptions",
      param: "pageSizeOptions",
      explain: `分页条数, 默认["10", "20", "30"]`,
      type: "object",
      defaultValue: `["10", "20", "30"]`
    },
];

export default class TableDataDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedRowKeys:[],
        };
    }

    // 请求消息列表
    getMyMessage=(paramms)=> {}

    // 删除消息
    delInform(id) {
        Modal.confirm({
            title: "您确定删除该消息吗?",
            okText: "确定",
            cancelText: "取消",
            onOk:()=> {
                // 显示删除成功Alert
                message.success("删除成功");
            },
            onCancel() {}
        });
    }

    // 初始化表头数据
    getInitialTableHead1() {
        // 设置table的表头标题
        this.tableColumns = [
            {
                width: "15%",
                title: "标题",
                key: "title",
                dataIndex: "title",
            },
            {
                width: "15%",
                title: "金额",
                key: "money",
                dataIndex: "money",
                align:"right"
            },
            {
                width: "20%",
                title: "发送时间",
                key: "sendTime",
                dataIndex: "sendTime",
            },
            {
                width: "17%",
                title: "状态",
                key: "status",
                dataIndex: "status",
                render: (status) => {
                  return <Space size="small">
                      {[<Badge status="error" />, <Badge status="success" />, <Badge status="default" />][status]}
                      <span>{["未上线", "已上线", "异常"][status]}</span>
                  </Space>
              },
            },
            {
                title: "操作",
                key: "operation",
                render: (rowData) => (
                  <span>
                      <a href="javascript:;" onClick={() => {this.delInform(rowData.id);}}>编辑</a>
                      <a href="javascript:;" onClick={() => {this.delInform(rowData.id);}}>删除</a>
                  </span>
                )
            }
        ];
        return this.tableColumns;
    }

    render() {
        const dataList1={
            page:{
                "pageNo": 1,
                "pageSize": 10,
                "totalCount": 17,
                "totalPage": 2,
                "entities": [
                  {
                    "id": 1,
                    "title": "我是标题",
                    "money": 13245.45,
                    "sendTime": "2018-01-05",
                    "status": 0
                  }, 
                  {
                    "id": 2,
                    "title": "我是标题",
                    "money": 10523.30,
                    "sendTime": "2018-01-06",
                    "status": 1
                  },  
                  {
                    "id": 3,
                    "title": "我是标题",
                    "money": 8654.00,
                    "sendTime": "2018-01-07",
                    "status": 2
                  },
              ]
            }
        }
        const dataList2={
            page:{
                "pageNo": 1,
                "pageSize": 10,
                "totalCount": 17,
                "totalPage": 2,
                "entities": [
                  {
                    "id": 1,
                    "title": "我是标题",
                    "money": 13245.45,
                    "sendTime": "2018-01-05",
                    "status": 0,
                    children:[
                      {
                        "id": 11,
                        "title": "我是子标题",
                        "money": 524.05,
                        "sendTime": "2018-01-05",
                        "status": 0,
                      },
                      {
                        "id": 12,
                        "title": "我是子标题",
                        "money": 841.56,
                        "sendTime": "2018-01-05",
                        "status": 1,
                      },
                    ]
                  }, 
                  {
                    "id": 2,
                    "title": "我是标题",
                    "money": 10523.30,
                    "sendTime": "2018-01-06",
                    "status": 1,
                    children:[{
                      "id": 21,
                      "title": "我是子标题",
                      "money": 457.42,
                      "sendTime": "2018-01-06",
                      "status": 0,
                    }]
                  },  
                  {
                    "id": 3,
                    "title": "我是标题",
                    "money": 8654.00,
                    "sendTime": "2018-01-07",
                    "status": 2
                  },
              ]
            }
        }

        const rowSelection = {
          selectedRowKeys:this.state.selectedRowKeys,
          onChange: selectedRowKeys => {
            this.setState({ selectedRowKeys });
          }
        };

        return (
            <div>
                <h2>TableData 示例：</h2>
                <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap"}}>

                  {/* 简单版 */}
                  <div style={{width:"48%"}}>
                    <TableData
                      intervalColor
                      columns={this.getInitialTableHead1()}
                      dataSource={ dataList1 }
                      queryData={paramms => this.getMyMessage(paramms)}
                  />
                  
                  <CodeStatus>{`
  import { TableData } from "cake-ui"
  import { Badge,Space  } from "antd";

  const columns=${JSON.stringify(this.getInitialTableHead1(),null,2)}

  const dataList=${JSON.stringify(dataList1,null,2)}

  <TableData
      intervalColor
      columns={columns}
      dataSource={ dataList }
      queryData={paramms => this.getMyMessage(paramms)}
  />
                  `}</CodeStatus>
                  </div>


                  {/* checkbox版 */}
                  <div style={{width:"48%"}}>
                    <TableData
                      borderedOut
                      columns={this.getInitialTableHead1()}
                      dataSource={ dataList1 }
                      rowSelection={rowSelection}
                      queryData={paramms => this.getMyMessage(paramms)}
                  />
                  
                  <CodeStatus>{`
  import { TableData } from "cake-ui"
  import { Badge,Space  } from "antd";

  this.state = {
    selectedRowKeys:[],
  };

  const columns=${JSON.stringify(this.getInitialTableHead1(),null,2)}

  const dataList=${JSON.stringify(dataList1,null,2)}
  const rowSelection=${JSON.stringify(rowSelection,null,2)}

  <TableData
      borderedOut
      columns={columns}
      dataSource={ dataList }
      rowSelection={rowSelection}
      queryData={paramms => this.getMyMessage(paramms)}
  />
                  `}</CodeStatus>
                  </div>


                  {/* tree版 */}
                  <div style={{width:"100%"}}>
                    <TableData
                      columns={this.getInitialTableHead1()}
                      dataSource={ dataList2 }
                      expandable={{
                        indentSize:15,
                      }}
                      queryData={paramms => this.getMyMessage(paramms)}
                  />
                  
                  <CodeStatus>{`
  import { TableData } from "cake-ui"
  import { Badge,Space  } from "antd";

  const columns=${JSON.stringify(this.getInitialTableHead1(),null,2)}

  const dataList=${JSON.stringify(dataList2,null,2)}

  <TableData
      columns={columns}
      dataSource={ dataList }
      queryData={paramms => this.getMyMessage(paramms)}
  />
                  `}</CodeStatus>
                  </div>

                </div>
                
               
               
                {/* 参数说明 */}
                <h2>组件属性</h2>
                <Doc dataList={propsConfig} />
            </div>
        )
    }
}

