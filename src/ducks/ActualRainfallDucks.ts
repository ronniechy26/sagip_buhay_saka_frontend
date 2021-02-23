import {
    ICustomAction,
    ICommonState,
    IReturnPromise,
    ICommonAction,
} from '../ducks';
import ReducerFactory from '../libraries/reducerFactory';
import ThunkFactory from '../libraries/thunkFactory';
import { IActualRainfall } from '../models/ActualRainfallModel';
import services from '../services/ActualRainfallService';

export const actionTypes = {
    ACTUALRAINFALL_FETCH_LIST: 'ACTUALRAINFALL_FETCH_LIST',
    ACTUALRAINFALL_ADD : 'ACTUALRAINFALL_ADD',
    ACTUALRAINFALL_READ : 'ACTUALRAINFALL_READ',
    ACTUALRAINFALL_UPDATE : 'ACTUALRAINFALL_UPDATE',
} as const;

const thunkActions = {
    fetch_actual_rainfall : {
        type: actionTypes.ACTUALRAINFALL_FETCH_LIST,
        service: services.fetch_actual_rainfall,
    },
    add_actual_rainfall : {
        type: actionTypes.ACTUALRAINFALL_ADD,
        service: services.add_actual_rainfall,
    },
    read_actual_rainfall : {
        type: actionTypes.ACTUALRAINFALL_READ,
        service: services.read_actual_rainfall,
    },
    update_actual_rainfall : {
        type: actionTypes.ACTUALRAINFALL_UPDATE,
        service: services.update_actual_rainfall,
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

export interface IActualRainfallState extends ICommonState<IReducerAction> {
    list? : Array<IActualRainfall>;
    data? : IActualRainfall,
    selected_data? : IActualRainfall
}

const defaultState: IActualRainfallState = {
    status: {},
};

export const ActualRainfallReducer = (
    state: IActualRainfallState = defaultState,
    action: ICommonAction<IReducerAction>
): IActualRainfallState => {
    switch (action.type) {
        case actionTypes.ACTUALRAINFALL_FETCH_LIST : 
            return {
                ...state,
                list : action.payload.data,
            };
        case actionTypes.ACTUALRAINFALL_ADD : 
            return {
                ...state,
                data : action.payload.actual_rainfall,
            };
        case actionTypes.ACTUALRAINFALL_READ : 
            return {
                ...state,
                selected_data : action.payload.actual_rainfall,
            };
        case actionTypes.ACTUALRAINFALL_UPDATE : 
            return {
                ...state,
                data : action.payload.actual_rainfall,
            };
        default:
            return state;
    }
};

export default ReducerFactory(ActualRainfallReducer, defaultState);