import React from "react";
import { Table } from "antd";

const columns=[
  {
    width:"15%",
    title: "参数",
    dataIndex: "param",
  },
  {
    width:"50%",
    title: "说明",
    dataIndex: "explain"
  },
  {
    width:"15%",
    title: "类型",
    dataIndex: "type"
  },
  {
    title: "默认值",
    dataIndex: "defaultValue"
  }
]

export default (props)=>{
  return (
    <Table
      size="small"
      columns={columns}
      dataSource={props.dataList}
      pagination = {false}
    />
  )
}
