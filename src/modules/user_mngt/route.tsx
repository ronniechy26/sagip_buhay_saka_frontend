import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Result } from 'antd';
import { useSelector} from 'react-redux';
import { IState } from '../../ducks';
import Landing from './pages/landing';

const UserRoute = () => {
    const user = useSelector((state : IState) => state.UserReducer.data);
    if(user && (user.role === 'PAGASA' || user.role === 'LGU')) {
        return (
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
            />
        )
    };

    return (
        <Switch>
            <Route path="/sagip/users" exact component={Landing}/>
        </Switch>
    )
}

export default UserRoute;
