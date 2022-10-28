import { get } from 'lodash';
import {
    ICustomAction,
    ICommonState,
    IReturnPromise,
    ICommonAction,
} from '../ducks';
import ReducerFactory from '../libraries/reducerFactory';
import ThunkFactory from '../libraries/thunkFactory';
import { IUser } from '../models/UserModel';
import services from '../services/UserService';


export const actionTypes = {
    USER_LOGIN: 'USER_LOGIN',
    USER_LOGOUT: 'USER_LOGOUT',
    USER_FETCH_DATA: 'USER_FETCH_DATA',
    USER_FETCH_LIST : 'USER_FETCH_LIST',
    USER_DEACTIVATE : 'USER_DEACTIVATE',
    USER_ACTIVATE : 'USER_ACTIVATE',
    USER_ADD : 'USER_ADD',
    USER_SET_SELECTED : 'USER_SET_SELECTED',
    USER_UPDATE : 'USER_UPDATE',
    USER_REMOVE_SELECTED : 'USER_REMOVE_SELECTED',
    USER_UPDATE_CREDIT : 'USER_UPDATE_CREDIT',
    USER_CHANGE_PASSWORD : 'USER_CHANGE_PASSWORD'
} as const;

export const syncActions = {
    logout: () => ({
        type: actionTypes.USER_LOGOUT,
        payload: null,
    }),
    remove_user_selected : () => ({
        type: actionTypes.USER_REMOVE_SELECTED,
        payload: null,
    })
};

export type ISyncActions = typeof syncActions;
export type ISyncAction = {
    [key in keyof ISyncActions]: ICustomAction<
        ReturnType<ISyncActions[key]>['type'],
        ReturnType<ISyncActions[key]>['payload']
    >;
}[keyof ISyncActions];

const thunkActions = {
    login: {
        type: actionTypes.USER_LOGIN,
        service: services.login,
    },
    fetch_user : {
        type: actionTypes.USER_FETCH_DATA,
        service: services.fetch_user,
    },
    fetch_users : {
        type: actionTypes.USER_FETCH_LIST,
        service: services.fetch_users,
    },
    deactivate_user : {
        type : actionTypes.USER_DEACTIVATE,
        service : services.deactivate_user
    },
    activate_user : {
        type : actionTypes.USER_ACTIVATE,
        service : services.activate_user
    },
    add_user : {
        type : actionTypes.USER_ADD,
        service : services.add_user
    },
    set_selected_user : {
        type: actionTypes.USER_SET_SELECTED,
        service: services.fetch_user,
    },
    update_user : {
        type: actionTypes.USER_UPDATE,
        service: services.update_user,
    },
    update_credit : {
        type: actionTypes.USER_UPDATE_CREDIT,
        service: services.update_credit,
    },
    change_password : {
        type : actionTypes.USER_CHANGE_PASSWORD,
        service : services.change_password
    }
    
};

export const asyncActions = ThunkFactory(thunkActions);
type IThunkActions = typeof thunkActions;

export type IAsyncAction = {
    [key in keyof IThunkActions]: ICustomAction<
        IThunkActions[key]['type'],
        IReturnPromise<ReturnType<IThunkActions[key]['service']>>
    >;
}[keyof IThunkActions];

export type IReducerAction = ISyncAction | IAsyncAction;

export interface IUserState extends ICommonState<IReducerAction> {
    data? : IUser;
    list? : Array<IUser>;
    selected_user? : IUser;
}

const defaultState: IUserState = {
    status: {},
};

export const UserReducer = (
    state: IUserState = defaultState,
    action: ICommonAction<IReducerAction>
): IUserState => {
    switch (action.type) {
        case actionTypes.USER_LOGIN: {
            localStorage.setItem(
                process.env.REACT_APP_STORAGE_KEY_AUTH!,
                get(action, 'payload.token', '')
            );
            localStorage.setItem(
                process.env.REACT_APP_STORAGE_KEY_USER!,
                get(action, 'payload.user.id', '')
            );
            return {
                ...state,
                data: get(action, 'payload.user'),
            };
        }

        case actionTypes.USER_FETCH_DATA : 
            return {
                ...state,
                data: action.payload,
            };

        case actionTypes.USER_FETCH_LIST : 
            return {
                ...state,
                list : action.payload.data,
            };

        case actionTypes.USER_LOGOUT:
            localStorage.removeItem(process.env.REACT_APP_STORAGE_KEY_AUTH!);
            localStorage.removeItem(process.env.REACT_APP_STORAGE_KEY_USER!);
            return {
                ...state,
                data: undefined,
            };
            
        case actionTypes.USER_SET_SELECTED : 
            return {
                ...state,
                selected_user : action.payload,
            };

        case actionTypes.USER_UPDATE_CREDIT : 
            return {
                ...state,
                selected_user : action.payload.user,
            };

        case actionTypes.USER_CHANGE_PASSWORD : 
            return {
                ...state,
                selected_user : action.payload.user,
            };

        case actionTypes.USER_ADD : 
            return {
                ...state,
                list : [...state.list as IUser[], action.payload.user]
            };

        case actionTypes.USER_REMOVE_SELECTED:
            return {
                ...state,
                selected_user: undefined,
            };
        
        default:
            return state;
    }
};

export default ReducerFactory(UserReducer, defaultState);