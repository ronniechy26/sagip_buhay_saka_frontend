import { notification } from 'antd';
import { TYPE_ERROR } from '../constants';
import { syncActions } from '../ducks/UserDuck';

const TokenMiddleware = (store : any) => (next :any) => (action :any) => {
    if (
        action.status === TYPE_ERROR &&
        ((Array.isArray(action.payload) &&
            action.payload[0] === 'Token has expired') ||
            action.payload.message === 'Token has expired')
    ) {
        store.dispatch(syncActions.logout());
        notification.error({
            message : 'Token has expired',
            description : 'Please Log in again'
        })
    }

    return next(action);
};

export default TokenMiddleware;