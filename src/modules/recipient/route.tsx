import React from 'react';
import { Result} from 'antd';
import { Route, Switch } from 'react-router-dom';
import { useSelector} from 'react-redux';
import Landing from './pages/landing';
import AddEdit from './pages/AddEdit';
import { IState } from '../../ducks';

const RecipientRoute = () => {
    const user = useSelector((state : IState) => state.UserReducer.data);
    if(user && user.role === 'PAGASA') {
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
            <Route exact path="/sagip/recipient" component={Landing}/>
            <Route exact path="/sagip/recipient/:action/:id?" component={AddEdit}/>
        </Switch>
    )
}

export default RecipientRoute;
