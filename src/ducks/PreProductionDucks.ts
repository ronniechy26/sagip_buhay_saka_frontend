import {
    ICustomAction,
    ICommonState,
    IReturnPromise,
    ICommonAction,
} from '../ducks';
import ReducerFactory from '../libraries/reducerFactory';
import ThunkFactory from '../libraries/thunkFactory';
import { IPreProduction } from '../models/PreProductionModel';
import services from '../services/PreProductionService';

export const actionTypes = {
    PRE_PRODUCTION_FETCH_LIST: 'PRE_PRODUCTION_FETCH_LIST',
    PRE_PRODUCTION_ADD : 'PRE_PRODUCTION_ADD',
    PRE_PRODUCTION_UPDATE : 'PRE_PRODUCTION_UPDATE',
    PRE_PRODUCTION_DEACTIVATE : 'PRE_PRODUCTION_DEACTIVATE',
    PRE_PRODUCTION_ACTIVATE : 'PRE_PRODUCTION_ACTIVATE'
} as const;

const thunkActions = {
    fetch_pre_productions : {
        type: actionTypes.PRE_PRODUCTION_FETCH_LIST,
        service: services.fetch_pre_productions,
    },
    add_pre_production : {
        type: actionTypes.PRE_PRODUCTION_ADD,
        service: services.add_pre_production,
    },
    update_pre_production : {
        type: actionTypes.PRE_PRODUCTION_UPDATE,
        service: services.update_pre_production,
    },
    deactivate_pre_production : {
        type: actionTypes.PRE_PRODUCTION_DEACTIVATE,
        service: services.deactivate_pre_production,
    },
    activate_pre_production : {
        type: actionTypes.PRE_PRODUCTION_ACTIVATE,
        service: services.activate_pre_production,
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

export interface IPreProductionState extends ICommonState<IReducerAction> {
    list? : Array<IPreProduction>;
    data? : IPreProduction
}

const defaultState: IPreProductionState = {
    status: {},
};

export const PreProductionReducer = (
    state: IPreProductionState = defaultState,
    action: ICommonAction<IReducerAction>
): IPreProductionState => {
    switch (action.type) {
        case actionTypes.PRE_PRODUCTION_FETCH_LIST : 
            return {
                ...state,
                list : action.payload.data,
            };

        case actionTypes.PRE_PRODUCTION_ADD : 
            return {
                ...state,
                data : action.payload.pre_production_type,
            };

        case actionTypes.PRE_PRODUCTION_UPDATE : 
            return {
                ...state,
                data : action.payload.pre_production_type,
            };

        case actionTypes.PRE_PRODUCTION_DEACTIVATE : 
            return {
                ...state,
                data : action.payload.pre_production_type,
            };
        case actionTypes.PRE_PRODUCTION_ACTIVATE : 
            return {
                ...state,
                data : action.payload.pre_production_type,
            };
        default:
            return state;
    }
};

export default ReducerFactory(PreProductionReducer, defaultState);