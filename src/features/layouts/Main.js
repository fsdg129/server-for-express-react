import React, { useState } from 'react';
import {
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";


import 'antd/dist/antd.css';
import './main.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import {

  UserOutlined,
  BarcodeOutlined
} from '@ant-design/icons';

import User from '../users/User'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function Main() {

    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };

    let match = useRouteMatch('/main');

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" >
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

                        <SubMenu key="sub1" icon={<UserOutlined />} title="Profile">
                            <Menu.Item key="1">
                                <Link to="/main/user" className="menu-text">Manage Account</Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/main/user/log-info" className="menu-text">Display Log Info</Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to="/main/user/log-info-edit" className="menu-text">Change Log Info</Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Link to="/main/user/account-info" className="menu-text">Account Info</Link>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Link to="/main/user/account-info-edit" className="menu-text">Change Account Info</Link>
                            </Menu.Item>
                            <Menu.Item key="6">
                                <Link to="/main/user/log-out" className="menu-text">Log out</Link>
                            </Menu.Item>
                        </SubMenu>

                        <SubMenu key="sub2" icon={<BarcodeOutlined />} title="Orders">
                            <Menu.Item key="7">
                                <Link to="/main/orders/new-order" className="menu-text">New Order</Link>
                            </Menu.Item>
                            <Menu.Item key="8">
                                <Link to="/main/orders/history-orders" className="menu-text">History Orders</Link>
                            </Menu.Item>
                            <Menu.Item key="9">
                                <Link to="/main/orders/search-orders" className="menu-text">Search Orders</Link>
                            </Menu.Item>
                        </SubMenu>

                    </Menu>
                </div>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>

                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <Switch>
                            <Route path='/main/user'>
                                <User />
                            </Route>
                            <Route path='/main'>
                                <div></div>
                            </Route>
                            <Route path={match.path}>
                                <h3>Developing</h3>
                            </Route>
                        </Switch>
                    </div>

                </Content>
                <Footer style={{ textAlign: 'center' }}>Developed by Yaozu Wu</Footer>
            </Layout>
        </Layout>
    );

}

