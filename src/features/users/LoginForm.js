import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit'
import { Link, useHistory } from 'react-router-dom';


import 'antd/dist/antd.css';
import './loginForm.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { 
  updateUsernamePassword, 
  updateOperatingUser, 
  fetchUserById, 
  selectFetchingUserError,
  login 
} from './usersSlice'

export default function LoginForm() {

  const dispatch = useDispatch();
  const history = useHistory();

  let error = useSelector(selectFetchingUserError);

  const onFinish = ( values => {
    let loggingInformation = {
      username: values.username,
      password: values.password
    }
    dispatch( updateUsernamePassword(loggingInformation) );
    dispatch( fetchUserById("user") )
      .then(unwrapResult)
      .then( () => {
        dispatch( updateOperatingUser() );
        dispatch( login() );
        if(values.remember){
          window.localStorage.setItem("username", values.username);
          window.localStorage.setItem("password", values.password);
        }
        //change url
        history.push('/main')
      })
      .catch( () => {
        message.error(error.displayMessage);
      });

  });

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <Link to="/register" className="menu-text">register now!</Link>
      </Form.Item>
    </Form>
  );
};
