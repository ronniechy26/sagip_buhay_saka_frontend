import {
    ICustomAction,
    ICommonState,
    IReturnPromise,
    ICommonAction,
} from '../ducks';
import ReducerFactory from '../libraries/reducerFactory';
import ThunkFactory from '../libraries/thunkFactory';
import { INormalRainfall } from '../models/NormalRainfallModel';
import services from '../services/NormalRainfallService';

export const actionTypes = {
    NORMALRAINFALL_READ : 'NORMALRAINFALL_READ',
    NORMALRAINFALL_UPDATE : 'NORMALRAINFALL_UPDATE',
} as const;

const thunkActions = {
    read_normal_rainfall : {
        type: actionTypes.NORMALRAINFALL_READ,
        service: services.read_normal_rainfall,
    },
    update_normal_rainfall : {
        type: actionTypes.NORMALRAINFALL_UPDATE,
        service: services.update_normal_rainfall,
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

export interface INormalRainfallState extends ICommonState<IReducerAction> {
    list? : Array<INormalRainfall>;
    data? : INormalRainfall,
}

const defaultState: INormalRainfallState = {
    status: {},
};

export const NormalRainfallReducer = (
    state: INormalRainfallState = defaultState,
    action: ICommonAction<IReducerAction>
): INormalRainfallState => {
    switch (action.type) {
        case actionTypes.NORMALRAINFALL_READ : 
            return {
                ...state,
                data : action.payload.normal_rainfall,
            };
        case actionTypes.NORMALRAINFALL_UPDATE : 
            return {
                ...state,
                data : action.payload.normal_rainfall,
            };
        default:
            return state;
    }
};

export default ReducerFactory(NormalRainfallReducer, defaultState);