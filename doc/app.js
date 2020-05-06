import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch, Router } from "react-router-dom";
import createHistory from "history/createHashHistory";
import DocRouter from "./router";

// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from "antd/es/locale/zh_CN";
import "antd/dist/antd.css";
import "cake-ui/style/component.css";

ReactDOM.render(
  <div className="component-template">
    <Router history={createHistory()}>
      <Switch>
        <Route path="/" component={DocRouter}></Route>
      </Switch>
    </Router>
  </div>,
  document.getElementById("doc")
);
