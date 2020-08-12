import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import AppTest from "./AppTest.js";
import store from './app/store';

ReactDOM.render(
    <Provider store={store}>
        <AppTest />
    </Provider>, 
    document.getElementById("root")
    );