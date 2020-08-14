import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectOperatingUser } from './usersSlice';
import { Descriptions } from 'antd';

export default function UserDisplay() {

    const user = useSelector(selectOperatingUser);

    return (
        <Descriptions title="User Info">
            <Descriptions.Item label="UserName">{user.name}</Descriptions.Item>
            <Descriptions.Item label="Priviledge">{user.priviledge}</Descriptions.Item>
        </Descriptions>       
    );
}