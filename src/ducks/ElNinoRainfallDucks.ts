import {
    ICustomAction,
    ICommonState,
    IReturnPromise,
    ICommonAction,
} from '.';
import ReducerFactory from '../libraries/reducerFactory';
import ThunkFactory from '../libraries/thunkFactory';
import { IElNinoRainfall } from '../models/ElNinoRainfallModel';
import services from '../services/ElNinoRainfallService';

export const actionTypes = {
    ELNINO_RAINFALL_READ : 'ELNINO_RAINFALL_READ',
    ELNINO_RAINFALL_UPDATE : 'ELNINO_RAINFALL_UPDATE',
} as const;

const thunkActions = {
    read_el_nino_rainfall : {
        type: actionTypes.ELNINO_RAINFALL_READ,
        service: services.read_el_nino_rainfall,
    },
    update_el_nino_rainfall : {
        type: actionTypes.ELNINO_RAINFALL_UPDATE,
        service: services.update_el_nino_rainfall,
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

export interface IElNinoRainfallState extends ICommonState<IReducerAction> {
    list? : Array<IElNinoRainfall>;
    data? : IElNinoRainfall,
}

const defaultState: IElNinoRainfallState = {
    status: {},
};

export const ElNinoRainfallReducer = (
    state: IElNinoRainfallState = defaultState,
    action: ICommonAction<IReducerAction>
): IElNinoRainfallState => {
    switch (action.type) {
        case actionTypes.ELNINO_RAINFALL_READ : 
            return {
                ...state,
                data : action.payload.el_nino_rainfall,
            };
        case actionTypes.ELNINO_RAINFALL_UPDATE : 
            return {
                ...state,
                data : action.payload.el_nino_rainfall,
            };
        default:
            return state;
    }
};

export default ReducerFactory(ElNinoRainfallReducer, defaultState);