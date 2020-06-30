import React,{Component} from "react"
import {Route} from "react-router-dom";
import { Layout } from 'antd';
import Loadable from "react-loadable";
import AsideMenu from "./Aside/asideMenu"  
import MyLoadingComponent from "../components/loadComponents";
const {  Content } = Layout;

const routes = [
    {
        path: "payAttention", // 注意事项
        component: Loadable({
            loader: () =>
                import("./Content/PayAttention/payAttention"),
            loading: MyLoadingComponent
        }),
         isExact: true
    },
    {
        path: "searchForm",
        component: Loadable({
            loader: () =>
                import("./Content/SearchForm/searchFormDemo"),
            loading: MyLoadingComponent
        }),
         isExact: true
    },
    {
        path: "tableData",
        component: Loadable({
            loader: () =>
                import("./Content/TableData/tableDataDemo"),
            loading: MyLoadingComponent
        }),
        isExact: true
    },
    {
        path: "form",
        component: Loadable({
            loader: () =>
                import("./Content/Form/formDemo"),
            loading: MyLoadingComponent
        }),
        isExact: true
    },
    {
        path: "popForm",
        component: Loadable({
            loader: () =>
                import("./Content/PopForm/popFormDemo"),
            loading: MyLoadingComponent
        }),
        isExact: true
    },
    {
        path: "draggableModal",
        component: Loadable({
            loader: () =>
                import("./Content/DraggableModal/draggableModalDemo"),
            loading: MyLoadingComponent
        }),
        isExact: true
    },
    {
        path: "draggablePopForm",
        component: Loadable({
            loader: () =>
                import("./Content/DraggableModal/draggablePopFormDemo"),
            loading: MyLoadingComponent
        }),
        isExact: true
    },
    {
        path: "checkTagGroup",
        component: Loadable({
            loader: () =>
                import("./Content/CheckTagGroup/checkTagGroupDemo"),
            loading: MyLoadingComponent
        }),
         isExact: true
    },
    {
        path: "editor",
        component: Loadable({
            loader: () =>
                import("./Content/Editor/editorDemo"),
            loading: MyLoadingComponent
        }),
        isExact: true
    },
    {
        path: "tree",
        component: Loadable({
            loader: () =>
                import("./Content/Tree/treeDemo"),
            loading: MyLoadingComponent
        }),
        isExact: true
    },
    {
        path: "slider",
        component: Loadable({
            loader: () =>
                import("./Content/Slider/sliderDemo"),
            loading: MyLoadingComponent
        }),
        isExact: true
    },
    {
        path: "steps",
        component: Loadable({
            loader: () =>
                import("./Content/Steps/StepsDemo"),
            loading: MyLoadingComponent
        }),
        isExact: true
    },
    {
        path: "button",
        component: Loadable({
            loader: () =>
                import("./Content/Button/buttonDemo"),
            loading: MyLoadingComponent
        }),
        isExact: true
    },
    {
        path: "badge",
        component: Loadable({
            loader: () =>
                import("./Content/Badge/BadgeDemo"),
            loading: MyLoadingComponent
        }),
        isExact: true
    },
    {
        path: "radioAndCheckbox",
        component: Loadable({
            loader: () =>
                import("./Content/RadioAndCheckbox/RadioAndCheckboxDemo"),
            loading: MyLoadingComponent
        }),
        isExact: true
    },
    {
        path: "switch",
        component: Loadable({
            loader: () =>
                import("./Content/Switch/SwitchDemo"),
            loading: MyLoadingComponent
        }),
        isExact: true
    },
    {
        path: "inputAndSelect",
        component: Loadable({
            loader: () =>
                import("./Content/InputAndSelect/InputAndSelectDemo"),
            loading: MyLoadingComponent
        }),
        isExact: true
    },
    {
        path: "descriptions",
        component: Loadable({
            loader: () =>
                import("./Content/Descriptions/DescriptionsDemo"),
            loading: MyLoadingComponent
        }),
        isExact: true
    },
    {
        path: "datePicker",
        component: Loadable({
            loader: () =>
                import("./Content/DatePicker/DatePickerDemo"),
            loading: MyLoadingComponent
        }),
        isExact: true
    },
    {
        path: "upload",
        component: Loadable({
            loader: () =>
                import("./Content/Upload/UploadDemo"),
            loading: MyLoadingComponent
        }),
        isExact: true
    },
    {
        path: "breadcrumb",
        component: Loadable({
            loader: () =>
                import("./Content/Breadcrumb/BreadcrumbDemo"),
            loading: MyLoadingComponent
        }),
        isExact: true
    },
    {
        path: "rate",
        component: Loadable({
            loader: () =>
                import("./Content/Rate/RateDemo"),
            loading: MyLoadingComponent
        }),
        isExact: true
    },
    {
        path: "transfer",
        component: Loadable({
            loader: () =>
                import("./Content/Transfer/TransferDemo"),
            loading: MyLoadingComponent
        }),
        isExact: true
    },
    {
        path: "transferTag",
        component: Loadable({
            loader: () =>
                import("./Content/TransferTag/transferTagDemo"),
            loading: MyLoadingComponent
        }),
        isExact: true
    },
    {
        path: "photoView",
        component: Loadable({
            loader: () =>
                import("./Content/PhotoView/photoViewDemo"),
            loading: MyLoadingComponent
        }),
        isExact: true
    },


    {
        path: "barChart",
        component: Loadable({
            loader: () =>
                import("./Content/Charts/barChart"),
            loading: MyLoadingComponent
        }),
        isExact: true
    },
    {
        path: "lineChart",
        component: Loadable({
            loader: () =>
                import("./Content/Charts/lineChart"),
            loading: MyLoadingComponent
        }),
        isExact: true
    },
    {
        path: "pieChart",
        component: Loadable({
            loader: () =>
                import("./Content/Charts/pieChart"),
            loading: MyLoadingComponent
        }),
        isExact: true
    },
    {
        path: "ringChart",
        component: Loadable({
            loader: () =>
                import("./Content/Charts/ringChart"),
            loading: MyLoadingComponent
        }),
        isExact: true
    },
];

class IndexContainer extends React.Component{
    render(){
        const {match} = this.props;
        
        const RouteWithSubRoutes = route => (
            <Route
                exact={route.isExact}
                path={`${match.url}/${route.path}`}
                render={props => <route.component {...props} routes={route.routes}/>}
            />
        )


        return <Layout>
                    <AsideMenu {...this.props}/>
                    <Layout style={{ background: '#fff',margin: '24px' }}>
                        <Content style={{ padding:"24px"}}>
                            {routes.map((route) => (
                                <RouteWithSubRoutes key={route.path} {...route} />
                            ))}
                        </Content>
                    </Layout>
                </Layout>
    }
}
export default IndexContainer

