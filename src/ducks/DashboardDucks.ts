import {
    ICustomAction,
    ICommonState,
    IReturnPromise,
    ICommonAction,
} from '.';
import ReducerFactory from '../libraries/reducerFactory';
import ThunkFactory from '../libraries/thunkFactory';
import { IDashboardRainfall } from '../models/DashboardModel';
import services from '../services/DashboardService';

export const actionTypes = {
    GET_RAINFALL : 'GET_RAINFALL',
} as const;

const thunkActions = {
    get_dashboard_rainfall : {
        type: actionTypes.GET_RAINFALL,
        service: services.get_dashboard_rainfall,
    },
};

export const asyncActions = ThunkFactory(thunkActions);
type IThunkActions = typeof thunkActions;

export type IAsyncAction = {
    [key in keyof IThunkActions]: ICustomAction<
        IThunkActions[key]['type'],
        IReturnPromise<ReturnType<IThunkActions[key]['service']>>
    >;
}[keyof IThunkActions];

export type IReducerAction = IAsyncAction;

export interface IDashboardState extends ICommonState<IReducerAction> {
    rainfall? : Array<IDashboardRainfall>,
}

const defaultState: IDashboardState = {
    status: {},
};

export const DashboardReducer = (
    state: IDashboardState = defaultState,
    action: ICommonAction<IReducerAction>
): IDashboardState => {
    switch (action.type) {
        case actionTypes.GET_RAINFALL : 
            return {
                ...state,
                rainfall : action.payload.data,
            };
        default:
            return state;
    }
};

export default ReducerFactory(DashboardReducer, defaultState);