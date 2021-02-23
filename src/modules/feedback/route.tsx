import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './pages/landing';

const UserRoute = () => {

    return (
        <Switch>
            <Route path="/sagip/feedbacks" exact component={Landing}/>
        </Switch>
    )
}

export default UserRoute;
