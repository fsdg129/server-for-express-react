import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useHistory } from 'react-router-dom';

//import { Offline } from "react-detect-offline";
import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Button,
  Modal,
  message
} from 'antd';

import { 
  addUser, 
  checkUsername, 
  selectUsernameAvailabilityError,
  selectAddUserError
} from './usersSlice'

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
      span: 8,
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

  let usernameAvailabilityError = useSelector(selectUsernameAvailabilityError);
  let addUsererror = useSelector(selectAddUserError);

  const [form] = Form.useForm();
  const onFinish = values => {
    let data = {
        username: values.username,
        password: values.password
    }
      
    dispatch( addUser(data) )
      .then(unwrapResult)
      .then( () => {
        Modal.success({
          content: 'Sign up successfully. Click Ok and the page will redirect to login page.',
          onOk() {
            //change url
            history.push('/login');
          },
        });
      })
      .catch( () => {
        message.error(addUsererror.displayMessage);
      });
  };

  const onClick = (event) => {
    let username = form.getFieldValue("username");
    dispatch( checkUsername(username) )
      .then(unwrapResult)
      .then( (availabille) =>{
        if(availabille){
          message.info('You could use this username');
        } else{
          message.error('The username has been used');
        }
      })
      .catch( () => {
        message.error(usernameAvailabilityError.displayMessage);
      });
  };

  return (
  <Form
    {...formItemLayout}
    name="register"
    form={form}
    onFinish={onFinish}
    scrollToFirstError
  >

    <Form.Item label="username">
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Button onClick = {onClick} >Check username availability</Button>
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
