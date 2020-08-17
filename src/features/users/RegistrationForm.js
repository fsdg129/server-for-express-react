import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit'
import { useHistory } from 'react-router-dom';

import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Select,
  Button,
  AutoComplete,
} from 'antd';

import { addUser, checkUsername, selectUsernameAvailability } from './features/users/usersSlice'

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default function RegistrationForm() {

    const dispatch = useDispatch();
    const history = useHistory();
    let boolAvailable = useSelector(selectUsernameAvailability);

  const [form] = Form.useForm();
  const onFinish = values => {
    let data = {
        username: values.username,
        password: values.password
    }
      
    dispatch( addUser(data) ).then( () => {
        //change url
        history.push('/login')
    });
  };

  const onClick = (event) => {
      let username = form.getFieldValue("username");
      dispatch( checkUsername(username) );

  };

  return (
    <Form
      {...formItemLayout}
      name="register"
      form={form}
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="username"
        label="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
        <Button onClick = {onClick} >Check username availability</Button>
        <div>
        {!boolAvailable ? (
            <Alert message="The username has been used." type="error" closable />
        ) : null}
        </div>
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};
