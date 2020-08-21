import React from 'react';
import {
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

import UserButtons from './UserButtons';
import UserDisplay from './UserDisplay';

export default function User(){

    let match = useRouteMatch('/main/user');

    return(
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Switch>
                <Route path='/main/user/log-info'>
                    <UserDisplay />
                </Route>
                <Route path={match.path}>
                    <UserButtons />
                </Route>
            </Switch>
        </div>
    );

}