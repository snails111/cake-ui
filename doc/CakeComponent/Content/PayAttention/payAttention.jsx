import React from "react"

export default ()=>{ 
    return <div className="attention">
                <h2>开发组件规范</h2>
                <p >组件的写法</p>
                <pre>
                   <code>1、传入的参数要做类型验证</code><br/>
                   <code>2、传入的参数要有默认值</code>
                </pre>  
                <p>组件的注释</p>  
                <pre>
                   <code>1、组件作者是谁要注释</code><br/>
                   <code>2、组件的功能是什么要有注释</code><br/>
                   <code>3、组件的里的函数要有注释</code><br/>
                   <code>4、组件的属性（可以传入配置）要有注释</code>
                </pre>
                <p>组件示列</p>  
                <pre>
                   <code>1、组件示列要让人对组件基本功能的有认识</code>
                </pre>    
                <p>cake-ui使用</p>  
                <pre>
                   <code>
                        >npm i cake-ui antd <br/>

                        import `ConfigProvider` from "antd" <br/>
                        // 由于 antd 组件的默认文案是英文，需要配置国际化（配合ConfigProvider组件）<br/>
                        import zhCN from "antd/es/locale/zh_CN"; <br/>
                        // 引入antd导出的css <br/>
                        import "antd/dist/antd.css"; <br/>
                        // 引入cake-ui导出的css <br/>
                        import "cake-ui/style/component.less"; <br/>

                    </code>
                </pre> 

           </div>
}