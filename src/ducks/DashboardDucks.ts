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
    GET_MIN_TEMP : 'GET_MIN_TEMP',
    GET_MAX_TEMP : 'GET_MAX_TEMP',
    GET_MEAN_TEMP : 'GET_MEAN_TEMP'
} as const;

const thunkActions = {
    get_dashboard_rainfall : {
        type: actionTypes.GET_RAINFALL,
        service: services.get_dashboard_rainfall,
    },
    get_dashboard_min_temp : {
        type: actionTypes.GET_MIN_TEMP,
        service: services.get_dashboard_min_temp,
    },
    get_dashboard_max_temp : {
        type: actionTypes.GET_MAX_TEMP,
        service: services.get_dashboard_max_temp,
    },
    get_dashboard_mean_temp : {
        type: actionTypes.GET_MEAN_TEMP,
        service: services.get_dashboard_mean_temp,
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

export type IReducerAction = IAsyncAction;

export interface IDashboardState extends ICommonState<IReducerAction> {
    rainfall? : Array<IDashboardRainfall>,
    min_temp? : Array<IDashboardRainfall>,
    mean_temp? : Array<IDashboardRainfall>,
    max_temp? : Array<IDashboardRainfall>,
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
        case actionTypes.GET_MAX_TEMP : 
            return {
                ...state,
                max_temp : action.payload.data,
            };
        case actionTypes.GET_MEAN_TEMP : 
            return {
                ...state,
                mean_temp : action.payload.data,
            };
        case actionTypes.GET_MIN_TEMP : 
            return {
                ...state,
                min_temp : action.payload.data,
            };
        default:
            return state;
    }
};

export default ReducerFactory(DashboardReducer, defaultState);