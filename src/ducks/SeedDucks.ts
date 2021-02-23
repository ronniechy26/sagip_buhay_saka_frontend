import {
    ICustomAction,
    ICommonState,
    IReturnPromise,
    ICommonAction,
} from '../ducks';
import ReducerFactory from '../libraries/reducerFactory';
import ThunkFactory from '../libraries/thunkFactory';
import { ISeed} from '../models/SeedModel';
import services from '../services/SeedService';

export const actionTypes = {
    SEED_FETCH_LIST: 'SEED_FETCH_LIST',
    SEED_ADD : 'SEED_ADD',
    SEED_UPDATE : 'SEED_UPDATE',
    SEED_DEACTIVATE : 'SEED_DEACTIVATE',
    SEED_ACTIVATE : 'SEED_ACTIVATE'
} as const;

const thunkActions = {
    fetch_seeds : {
        type: actionTypes.SEED_FETCH_LIST,
        service: services.fetch_seeds,
    },
    add_seed : {
        type: actionTypes.SEED_ADD,
        service: services.add_seed,
    },
    update_seed : {
        type: actionTypes.SEED_UPDATE,
        service: services.update_seed,
    },
    deactivate_seed : {
        type: actionTypes.SEED_DEACTIVATE,
        service: services.deactivate_seed,
    },
    activate_seed : {
        type: actionTypes.SEED_ACTIVATE,
        service: services.activate_seed,
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

export interface ISeedState extends ICommonState<IReducerAction> {
    list? : Array<ISeed>;
    data? : ISeed
}

const defaultState: ISeedState = {
    status: {},
};

export const SeedReducer = (
    state: ISeedState = defaultState,
    action: ICommonAction<IReducerAction>
): ISeedState => {
    switch (action.type) {
        case actionTypes.SEED_FETCH_LIST : 
            return {
                ...state,
                list : action.payload.data,
            };

        case actionTypes.SEED_ADD : 
            return {
                ...state,
                data : action.payload.seed_type,
            };

        case actionTypes.SEED_UPDATE : 
            return {
                ...state,
                data : action.payload.seed_type,
            };

        case actionTypes.SEED_DEACTIVATE : 
            return {
                ...state,
                data : action.payload.seed_type,
            };
        case actionTypes.SEED_ACTIVATE : 
            return {
                ...state,
                data : action.payload.seed_type,
            };
        default:
            return state;
    }
};

export default ReducerFactory(SeedReducer, defaultState);