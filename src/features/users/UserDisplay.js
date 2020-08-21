import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectOperatingUser } from './usersSlice';
import { Descriptions } from 'antd';

export default function UserDisplay() {

    const user = useSelector(selectOperatingUser);

    return (
        <Descriptions title="User Info">
            <Descriptions.Item label="Username">{user.username}</Descriptions.Item>
            <Descriptions.Item label="Priviledge">{user.priviledge}</Descriptions.Item>
        </Descriptions>       
    );
}