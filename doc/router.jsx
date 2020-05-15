import React,{Component} from "react"
import {Route, NavLink} from "react-router-dom";
import { Layout,Affix } from 'antd';
import Loadable from "react-loadable";
import MyLoadingComponent from "./components/loadComponents";
import "./router.less"

const { Header } = Layout;

const Start = Loadable({
    loader: () => import('./Start/index'),
    loading: MyLoadingComponent
})
const CakeComponent = Loadable({
    loader: () => import('./CakeComponent/index'),
    loading: MyLoadingComponent
})
const ReactCli = Loadable({
    loader: () => import('./ReactCli/index'),
    loading: MyLoadingComponent
})
const LearnGo = Loadable({
    loader: () => import('./LearnGo/index'),
    loading: MyLoadingComponent
})

 class Container extends React.Component{
  
    componentDidMount(){
       const url = document.location.href.split("#")[1];
        if (url === "/" ) {
            this.props.history.push("/Start")
        }
    }

    render(){
        
        return <Layout style={{height:"100vh"}}>
                    <Header className="doc-header-wrap">
                        <div className="logo"><span></span> cake-ui-doc</div>
                        <div className="headMenu">
                            <NavLink to="/Start" >起步</NavLink>
                            <NavLink to="/CakeComponent/payAttention">组件文档</NavLink>
                            <NavLink to="/ReactCli/cli">脚手架</NavLink>
                            <NavLink to="/LearnGo">学习方向</NavLink>
                        </div>
                    </Header>
                    <Layout>
                        <Route path="/Start" component={Start} />
                        <Route path="/CakeComponent" component={CakeComponent} />
                        <Route path="/ReactCli" component={ReactCli} />
                        <Route path="/LearnGo" component={LearnGo} />
                    </Layout>
                </Layout>
    }
}
export default Container


