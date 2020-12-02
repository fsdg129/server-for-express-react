import React from 'react';

import { Space, Typography } from 'antd';

import RegistrationForm from "../users/RegistrationForm";

const { Title } = Typography;

export default function Registration(){

    return (
        <Space direction="vertical" size="large">
            <Title>Create your account</Title>
            <RegistrationForm />
        </Space>
    );
}