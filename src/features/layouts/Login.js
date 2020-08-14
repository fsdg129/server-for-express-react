import React from 'react';
import { Link } from "react-router-dom";

import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { Row, Col } from 'antd';
import { Button } from 'antd';

import LoginForm from '../users/LoginForm';
import LoginFormError from '../users/LoginFormError';

const { Header, Footer, Sider, Content } = Layout;

export default function Login(){

    return (
    <Layout>
      <Header>
        <Col span={6}></Col>
        <Col span={6}></Col>
        <Col span={6}></Col>
        <Col span={6}>
            <Link to="/register">
                <Button type="primary">Sign Up</Button>
            </Link>
        </Col>  
      </Header>
      <Content>
        <Row>
            <Col span={12}>Notice or Qr code</Col>
            <Col span={12}>
                <div>
                    <LoginForm/>
                    <LoginFormError/>
                </div>
            </Col>
        </Row>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
    );

}