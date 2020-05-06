import React from 'react';
import ReactDOM from 'react-dom';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';
import 'antd/dist/antd.css';
import 'cake-ui/style/component.css';
import {Block} from 'cake-ui/src'; 

ReactDOM.render(
  <div className="component-template">
    <Block />
  </div>,
  document.getElementById('example'),
);
