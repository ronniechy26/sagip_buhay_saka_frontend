import {
    ICustomAction,
    ICommonState,
    IReturnPromise,
    ICommonAction,
} from '../ducks';
import ReducerFactory from '../libraries/reducerFactory';
import ThunkFactory from '../libraries/thunkFactory';
import { IClimateData } from '../models/ClimateDataModel';
import services from '../services/ClimateDataService';

export const actionTypes = {
    CLIMATEDATA_FETCH: 'CLIMATEDATA_FETCH',
    CLIMATEDATA_ADD : 'CLIMATEDATA_ADD',
    CLIMATEDATA_READ : 'CLIMATEDATA_READ',
    CLIMATEDATA_UPDATE : 'CLIMATEDATA_UPDATE',
} as const;

const thunkActions = {
    fetch_climate_data : {
        type: actionTypes.CLIMATEDATA_FETCH,
        service: services.fetch_climate_data,
    },
    add_climate_data : {
        type: actionTypes.CLIMATEDATA_ADD,
        service: services.add_climate_data,
    },
    read_climate_data : {
        type: actionTypes.CLIMATEDATA_READ,
        service: services.read_climate_data,
    },
    update_climate_data : {
        type: actionTypes.CLIMATEDATA_UPDATE,
        service: services.update_climate_data,
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

export interface IClimateDataState extends ICommonState<IReducerAction> {
    list? : Array<IClimateData>;
    data? : IClimateData,
    selected_data? : IClimateData
}

const defaultState: IClimateDataState = {
    status: {},
};

export const ClimateDataReducer = (
    state: IClimateDataState = defaultState,
    action: ICommonAction<IReducerAction>
): IClimateDataState => {
    switch (action.type) {
        case actionTypes.CLIMATEDATA_FETCH : 
            return {
                ...state,
                list : action.payload.data,
            };
        case actionTypes.CLIMATEDATA_ADD : 
            return {
                ...state,
                data : action.payload.climate_data,
            };
        case actionTypes.CLIMATEDATA_READ : 
            return {
                ...state,
                selected_data : action.payload.climate_data,
            };
        case actionTypes.CLIMATEDATA_UPDATE : 
            return {
                ...state,
                data : action.payload.climate_data,
            };
        default:
            return state;
    }
};

export default ReducerFactory(ClimateDataReducer, defaultState);