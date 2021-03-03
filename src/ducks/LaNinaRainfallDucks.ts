import {
    ICustomAction,
    ICommonState,
    IReturnPromise,
    ICommonAction,
} from '.';
import ReducerFactory from '../libraries/reducerFactory';
import ThunkFactory from '../libraries/thunkFactory';
import { ILaNinaRainfall } from '../models/LaNinaRainfallModel';
import services from '../services/LaNinaRainfallService';

export const actionTypes = {
    LANINA_RAINFALL_READ : 'LANINA_RAINFALL_READ',
    LANINA_RAINFALL_UPDATE : 'LANINA_RAINFALL_UPDATE',
} as const;

const thunkActions = {
    read_la_nina_rainfall : {
        type: actionTypes.LANINA_RAINFALL_READ,
        service: services.read_la_nina_rainfall,
    },
    update_la_nina_rainfall : {
        type: actionTypes.LANINA_RAINFALL_UPDATE,
        service: services.update_la_nina_rainfall,
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

export interface ILaNinaRainfallState extends ICommonState<IReducerAction> {
    list? : Array<ILaNinaRainfall>;
    data? : ILaNinaRainfall,
}

const defaultState: ILaNinaRainfallState = {
    status: {},
};

export const LaNinaRainfallReducer = (
    state: ILaNinaRainfallState = defaultState,
    action: ICommonAction<IReducerAction>
): ILaNinaRainfallState => {
    switch (action.type) {
        case actionTypes.LANINA_RAINFALL_READ : 
            return {
                ...state,
                data : action.payload.la_nina_rainfall,
            };
        case actionTypes.LANINA_RAINFALL_UPDATE : 
            return {
                ...state,
                data : action.payload.la_nina_rainfall,
            };
        default:
            return state;
    }
};

export default ReducerFactory(LaNinaRainfallReducer, defaultState);