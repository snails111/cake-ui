import React from "react"
import { Layout } from 'antd';
const { Content } = Layout;

export default ()=>{
    return <Layout>
                <Layout style={{ margin: '24px' }}>
                    <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280, }}>
                       <h2>手机软件方向：react-native、H5....</h2>
                    </Content>
                </Layout>
            </Layout>
}