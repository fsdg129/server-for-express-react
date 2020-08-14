import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFetchingUserStatus } from './usersSlice';

import 'antd/dist/antd.css';
import { Alert } from 'antd';

export default function LoginFormError() {
  
  const status = useSelector(selectFetchingUserStatus);

  return (
    <div>
      {status==='failed' ? (
        <Alert message="Incorrect username or password." type="error" closable />
      ) : null}
    </div>
  );
};
