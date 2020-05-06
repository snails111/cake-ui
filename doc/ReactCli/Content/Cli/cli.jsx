import React from "react"

export default ()=>{
    return <div>
               <h1>全局安装脚手架</h1>
               <pre>
                   <code> > npm i cake-react-cli -g </code>
               </pre>
               <h1>使用</h1>
               <p>查看模板:</p>
               <pre>
                   <code> > cake-react list </code>
                   <code> // cake-react l </code>
               </pre>
               <p>上传模板:</p>
               <pre>
                   <code> > cake-react add </code>
                   <code> // cake-react a </code>
               </pre>
               <p>下载模板：</p>
               <pre>
                   <code> > cake-react down </code>
                   <code> // cake-react d</code>
               </pre>
               {/* <div>
                   <span className="useCli"></span>
               </div>
               <p>现在页面模板(page-template)里的文件模板有：</p>
               <pre>
                   <code>1、searchTable.jsx。 表单搜索框加表格</code>
               </pre> */}
           </div>
}