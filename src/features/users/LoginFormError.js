import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import 'antd/dist/antd.css';
import { Alert } from 'antd';

import { selectFetchingUserStatus } from './usersSlice';

export default function LoginFormError() {
  
  let status = useSelector(selectFetchingUserStatus);

  return (
    <div>
      {status==='failed' ? (
        <Alert message="Incorrect username or password." type="error" closable />
      ) : null}
    </div>
  );
};
