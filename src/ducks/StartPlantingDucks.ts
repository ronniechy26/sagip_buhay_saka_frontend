import {
    ICustomAction,
    ICommonState,
    IReturnPromise,
    ICommonAction,
} from '../ducks';
import ReducerFactory from '../libraries/reducerFactory';
import ThunkFactory from '../libraries/thunkFactory';
import { IStartPlanting } from '../models/StartPlantingModel';
import services from '../services/StartPlantingService';

export const actionTypes = {
    START_PLANTING_FETCH_LIST: 'START_PLANTING_FETCH_LIST',
    START_PLANTING_ADD : 'START_PLANTING_ADD',
    START_PLANTING_UPDATE : 'START_PLANTING_UPDATE',
    START_PLANTING_DEACTIVATE : 'START_PLANTING_DEACTIVATE',
    START_PLANTING_ACTIVATE : 'START_PLANTING_ACTIVATE'
} as const;

const thunkActions = {
    fetch_start_plantings : {
        type: actionTypes.START_PLANTING_FETCH_LIST,
        service: services.fetch_start_plantings,
    },
    add_start_planting : {
        type: actionTypes.START_PLANTING_ADD,
        service: services.add_start_planting,
    },
    update_start_planting : {
        type: actionTypes.START_PLANTING_UPDATE,
        service: services.update_start_planting,
    },
    deactivate_start_planting : {
        type: actionTypes.START_PLANTING_DEACTIVATE,
        service: services.deactivate_start_planting,
    },
    activate_start_planting : {
        type: actionTypes.START_PLANTING_ACTIVATE,
        service: services.activate_start_planting,
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

export interface IStartPlantingState extends ICommonState<IReducerAction> {
    list? : Array<IStartPlanting>;
    data? : IStartPlanting
}

const defaultState: IStartPlantingState = {
    status: {},
};

export const StartPlantingReducer = (
    state: IStartPlantingState = defaultState,
    action: ICommonAction<IReducerAction>
): IStartPlantingState => {
    switch (action.type) {
        case actionTypes.START_PLANTING_FETCH_LIST : 
            return {
                ...state,
                list : action.payload.data,
            };

        case actionTypes.START_PLANTING_ADD : 
            return {
                ...state,
                data : action.payload.start_planting_type,
            };

        case actionTypes.START_PLANTING_UPDATE : 
            return {
                ...state,
                data : action.payload.start_planting_type,
            };

        case actionTypes.START_PLANTING_DEACTIVATE : 
            return {
                ...state,
                data : action.payload.start_planting_type,
            };
        case actionTypes.START_PLANTING_ACTIVATE : 
            return {
                ...state,
                data : action.payload.start_planting_type,
            };
        default:
            return state;
    }
};

export default ReducerFactory(StartPlantingReducer, defaultState);