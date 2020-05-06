import React from "react"

export default ()=>{
    return <div>
               <h1>全局安装脚手架</h1>
               <pre>
                   <code> > npm i cake-react-cli -g </code>
               </pre>
               <h1>使用</h1>
               <p>更新信息：在根目录下，打开命令行使用如下命令更新流程管理的用户信息（账号、密码、项目Id）</p>
               <pre>
                   <code> > cake-config updateInfo </code>
                   <code> // cake-config u </code>
               </pre>
               <p>自动生成接口配置：在根目录下，打开命令行使用如下命令自动生成接口配置</p>
               <pre>
                   <code> > cake-config go </code>
                   <code> // cake-config g </code>
               </pre>
             
           </div>
}  