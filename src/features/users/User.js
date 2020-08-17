import React from 'react';

import UserButtons from './UserButtons';
import UserDisplay from './UserDisplay';

export default function User(){

    return(
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Switch>
                <Route path={'${match.path}/log-info'}>
                    <UserDisplay />
                </Route>
                <Route path={match.path}>
                    <UserButtons />
                </Route>
            </Switch>
        </div>
    );

}