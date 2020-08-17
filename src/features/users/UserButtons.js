import React from 'react';
import { Link } from "react-router-dom";

import { Row, Col, Button } from 'antd';

export default function UserButtons(){

    return (
        <div>
            <Row>
                <Col span={12}>
                    <Button type="primary" shape="round" size="large">
                        <Link to="/main/user/log-info" className="menu-text">Display Log Info</Link>
                    </Button>
                </Col>
                <Col span={12}>
                    <Button type="primary" shape="round" size="large">
                        <Link to="/main/user/log-info-edit" className="menu-text">Change Log Info</Link>
                    </Button>
                </Col>
            </Row>

            <Row>
                <Col span={12}>
                    <Button type="primary" shape="round" size="large">
                        <Link to="/main/user/account-info" className="menu-text">Account Info</Link>
                    </Button>
                </Col>
                <Col span={12}>
                    <Button type="primary" shape="round" size="large">
                        <Link to="/main/user/account-info-edit" className="menu-text">Change Account Info</Link>
                    </Button>
                </Col>
            </Row>

            <Row>
                <Col span={12}>
                    <Button type="primary" shape="round" size="large">
                        <Link to="/main/user/log-out" className="menu-text">Log out</Link>
                    </Button>
                </Col>
            </Row>
        </div>
    );
}