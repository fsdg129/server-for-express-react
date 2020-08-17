import React, { useState, useEffect } from "react";
import {hot} from "react-hot-loader";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import { Provider, useSelector, useDispatch, } from 'react-redux';

import store from './app/store';
import Login from "./Login";
import Main from "./Main";
import { updateUsernamePassword, updateUser, fetchUserById } from './features/users/usersSlice'

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
          dispatch( fetchUserById("user") ).then( () => {
            dispatch( updateUser() );
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
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/main">
            <Main />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default hot(module)(App);