import React, { useState, useEffect } from "react";
import {hot} from "react-hot-loader";
import {
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import { useSelector, useDispatch, } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';


import Login from "./features/layouts/Login";
import Main from "./features/layouts/Main";
import Registration from "./features/layouts/Registration";
import { 
  updateUsernamePassword, 
  updateOperatingUser, 
  fetchUserById,
  login
} from './features/users/usersSlice'

function App(){

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(
    () => {
        let username = window.localStorage.getItem("username");
        let password = window.localStorage.getItem("password");

        if (username && password ){
          let loggingInformation = {
            username: username,
            password: password
          }
          dispatch( updateUsernamePassword(loggingInformation) );
          dispatch( fetchUserById("user") )
            .then(unwrapResult)
            .then( () => {
              dispatch( updateOperatingUser() );
              dispatch( login() );
              //change url
              history.push('/main')
            }).catch( () => {
              history.push('/login');
            });
        } else{
          history.push('/login');
        }
    },
    []
  );

  return(
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/main">
          <Main />
        </Route>
        <Route path="/register">
          <Registration />
        </Route>
      </Switch>
  );
}

export default hot(module)(App);