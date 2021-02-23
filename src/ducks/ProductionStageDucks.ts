import {
    ICustomAction,
    ICommonState,
    IReturnPromise,
    ICommonAction,
} from '../ducks';
import ReducerFactory from '../libraries/reducerFactory';
import ThunkFactory from '../libraries/thunkFactory';
import { IProductionStage } from '../models/ProductionStageModel';
import services from '../services/ProductionStageService';

export const actionTypes = {
    PRODUCTION_STAGE_FETCH_LIST: 'PRODUCTION_STAGE_FETCH_LIST',
    PRODUCTION_STAGE_ADD : 'PRODUCTION_STAGE_ADD',
    PRODUCTION_STAGE_UPDATE : 'PRODUCTION_STAGE_UPDATE',
    PRODUCTION_STAGE_DEACTIVATE : 'PRODUCTION_STAGE_DEACTIVATE',
    PRODUCTION_STAGE_ACTIVATE : 'PRODUCTION_STAGE_ACTIVATE'
} as const;

const thunkActions = {
    fetch_production_stage : {
        type: actionTypes.PRODUCTION_STAGE_FETCH_LIST,
        service: services.fetch_production_stage,
    },
    add_production_stage : {
        type: actionTypes.PRODUCTION_STAGE_ADD,
        service: services.add_production_stage,
    },
    update_production_stage : {
        type: actionTypes.PRODUCTION_STAGE_UPDATE,
        service: services.update_production_stage,
    },
    deactivate_production_stage : {
        type: actionTypes.PRODUCTION_STAGE_DEACTIVATE,
        service: services.deactivate_production_stage,
    },
    activate_production_stage : {
        type: actionTypes.PRODUCTION_STAGE_ACTIVATE,
        service: services.activate_production_stage,
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

export interface IProductionStageState extends ICommonState<IReducerAction> {
    list? : Array<IProductionStage>;
    data? : IProductionStage
}

const defaultState: IProductionStageState = {
    status: {},
};

export const ProductionStageReducer = (
    state: IProductionStageState = defaultState,
    action: ICommonAction<IReducerAction>
): IProductionStageState => {
    switch (action.type) {
        case actionTypes.PRODUCTION_STAGE_FETCH_LIST : 
            return {
                ...state,
                list : action.payload.data,
            };

        case actionTypes.PRODUCTION_STAGE_ADD : 
            return {
                ...state,
                data : action.payload.production_stage_type,
            };

        case actionTypes.PRODUCTION_STAGE_UPDATE : 
            return {
                ...state,
                data : action.payload.production_stage_type,
            };

        case actionTypes.PRODUCTION_STAGE_DEACTIVATE : 
            return {
                ...state,
                data : action.payload.production_stage_type,
            };
        case actionTypes.PRODUCTION_STAGE_ACTIVATE : 
            return {
                ...state,
                data : action.payload.production_stage_type,
            };
        default:
            return state;
    }
};

export default ReducerFactory(ProductionStageReducer, defaultState);