import React,{Component} from "react";
import ReactDOM from "react-dom";
import { Route, Switch, Router } from "react-router-dom";
import createHistory from "history/createHashHistory";
import DocRouter from "./router";
import {ConfigProvider } from "antd"


// 由于 antd 组件的默认文案是英文，需要配置国际化（配合ConfigProvider组件）
import zhCN from "antd/es/locale/zh_CN";
// 引入antd导出的css
import "antd/dist/antd.css";
// 引入cake-ui导出的css
import "cake-ui/style/component.less";

// JSON.stringify(..)实用程序会在遇到undefined，function和symbol值时自动忽略。
Function.prototype.toJSON = function({...props}){
  // console.log(props,"---------- props",this())
  return this.toString()
}

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Router history={createHistory()}>
      <Switch>
        <Route path="/" component={DocRouter}></Route>
      </Switch>
    </Router>
  </ConfigProvider>,
  document.getElementById("doc")
);
