import React, { useState, Component, lazy, Suspense } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import axios from "axios"

import "../css/common.scss"
//导入子页面
import partyA from "./partyA"//甲方
import partyB from './partyB';//乙方
import designation from './designation';//产品名称
import color from './color';//颜色
import directions from './directions';//方向
import source from './source';//光源
import Addone from './AddOne';//新增
import List from './List';
import {
    SolutionOutlined,
    PieChartOutlined,
    AppstoreOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import "../css/common.scss"
export default function MenuList() {
    const { Header, Content, Sider } = Layout;
    type MenuItem = Required<MenuProps>['items'][number];
    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
        } as MenuItem;
    }
    const items: MenuItem[] = [

        getItem(<a href='#/menu/parta'>甲方管理</a>, '#/menu/parta', <PieChartOutlined />),
        getItem(<a href='#/menu/partyB'>乙方管理</a>, '#/menu/partyB',<AppstoreOutlined />),
        getItem(<a href='#/menu/designation'>产品名称管理</a>, '#/menu/designation', <AppstoreOutlined />),
        getItem(<a href='#/menu/color'>产品颜色管理</a>, '#/menu/color', <AppstoreOutlined />),
        getItem(<a href='#/menu/directions'>产品方向管理</a>, '#/menu/directions',<AppstoreOutlined />),
        getItem(<a href='#/menu/source'>产品光源管理</a>, '#/menu/source',<AppstoreOutlined />),
        getItem(<a href='#/menu/Addone'>新增订单</a>, '#/menu/Addone',<SolutionOutlined />),
        getItem(<a href='#/menu/List'>新增列表</a>, '#/menu/List', <SolutionOutlined />),
    ];

    return (
        <div className='MenuList'>
            <Layout className='LayoutDiv' style={{ minHeight: '100vh' }}>
                <Header className="header" style={{ background: "rgb(6, 27, 51)", fontSize:"18px"}}>
                    极简管理系统
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background" theme="light">
                        <Menu defaultSelectedKeys={[window.location.hash=='#/menu'?'#/menu/parta':window.location.hash]} mode="inline" items={items}
                            style={{ height: '100%', borderRight: 0 }}
                        />
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content style={{ margin: '0 16px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                            </Breadcrumb>
                            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                                <Router>
                                    <Suspense fallback={<div>loading....</div>}>
                                        <Switch>
                                            <Route path="/menu" component={partyA} exact></Route>
                                            <Route path="/menu/parta" component={partyA} ></Route>
                                            <Route path="/menu/partyB" component={partyB}></Route>
                                            <Route path="/menu/designation" component={designation}></Route>
                                            <Route path="/menu/color" component={color}></Route>
                                            <Route path="/menu/directions" component={directions}></Route>
                                            <Route path="/menu/source" component={source}></Route>
                                            <Route path="/menu/Addone" component={Addone}></Route>
                                            <Route path="/menu/List" component={List}></Route>
                                                   
                                        </Switch>
                                    </Suspense>
                                </Router>
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div >
    )
}
