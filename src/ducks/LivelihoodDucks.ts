import {
    ICustomAction,
    ICommonState,
    IReturnPromise,
    ICommonAction,
} from '../ducks';
import ReducerFactory from '../libraries/reducerFactory';
import ThunkFactory from '../libraries/thunkFactory';
import { ILivelihood } from '../models/LivelihoodModel';
import services from '../services/LivelihoodService';

export const actionTypes = {
    LIVELIHOOD_FETCH_LIST: 'LIVELIHOOD_FETCH_LIST',
    LIVELIHOOD_ADD : 'LIVELIHOOD_ADD',
    LIVELIHOOD_UPDATE : 'LIVELIHOOD_UPDATE',
    LIVELIHOOD_DEACTIVATE : 'LIVELIHOOD_DEACTIVATE',
    LIVELIHOOD_ACTIVATE : 'LIVELIHOOD_ACTIVATE'
} as const;

const thunkActions = {
    fetch_livelihoods : {
        type: actionTypes.LIVELIHOOD_FETCH_LIST,
        service: services.fetch_livelihoods,
    },
    add_livelihood : {
        type: actionTypes.LIVELIHOOD_ADD,
        service: services.add_livelihood,
    },
    update_livelihood : {
        type: actionTypes.LIVELIHOOD_UPDATE,
        service: services.update_livelihood,
    },
    deactivate_livelihood : {
        type: actionTypes.LIVELIHOOD_DEACTIVATE,
        service: services.deactivate_livelihood,
    },
    activate_livelihood : {
        type: actionTypes.LIVELIHOOD_ACTIVATE,
        service: services.activate_livelihood,
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

export interface ILivelihoodState extends ICommonState<IReducerAction> {
    list? : Array<ILivelihood>;
    data? : ILivelihood
}

const defaultState: ILivelihoodState = {
    status: {},
};

export const LivelihoodReducer = (
    state: ILivelihoodState = defaultState,
    action: ICommonAction<IReducerAction>
): ILivelihoodState => {
    switch (action.type) {
        case actionTypes.LIVELIHOOD_FETCH_LIST : 
            return {
                ...state,
                list : action.payload.data,
            };

        case actionTypes.LIVELIHOOD_ADD : 
            return {
                ...state,
                data : action.payload.livelihood_type,
            };

        case actionTypes.LIVELIHOOD_UPDATE : 
            return {
                ...state,
                data : action.payload.livelihood_type,
            };

        case actionTypes.LIVELIHOOD_DEACTIVATE : 
            return {
                ...state,
                data : action.payload.livelihood_type,
            };
        case actionTypes.LIVELIHOOD_ACTIVATE : 
            return {
                ...state,
                data : action.payload.livelihood_type,
            };
        default:
            return state;
    }
};

export default ReducerFactory(LivelihoodReducer, defaultState);