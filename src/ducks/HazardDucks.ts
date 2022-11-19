import {
    ICustomAction,
    ICommonState,
    IReturnPromise,
    ICommonAction,
} from '../ducks';
import ReducerFactory from '../libraries/reducerFactory';
import ThunkFactory from '../libraries/thunkFactory';
import { IHazard } from '../models/HazardModel';
import services from '../services/HazardService';

export const actionTypes = {
    HAZARD_FETCH_LIST: 'HAZARD_FETCH_LIST',
    HAZARD_FETCH_LIST_ID : 'HAZARD_FETCH_LIST_ID',
    HAZARD_ADD : 'HAZARD_ADD',
    HAZARD_UPDATE : 'HAZARD_UPDATE',
    HAZARD_DEACTIVATE : 'HAZARD_DEACTIVATE',
    HAZARD_ACTIVATE : 'HAZARD_ACTIVATE'
} as const;

const thunkActions = {
    fetch_hazards: {
        type: actionTypes.HAZARD_FETCH_LIST,
        service: services.fetch_hazards,
    },
    fetch_hazards_by_id: {
        type: actionTypes.HAZARD_FETCH_LIST_ID,
        service: services.fetch_hazards_id,
    },
    add_hazard : {
        type: actionTypes.HAZARD_ADD,
        service: services.add_hazard,
    },
    update_hazard : {
        type: actionTypes.HAZARD_UPDATE,
        service: services.update_hazard,
    },
    deactivate_hazard : {
        type: actionTypes.HAZARD_DEACTIVATE,
        service: services.deactivate_hazard,
    },
    activate_hazard : {
        type: actionTypes.HAZARD_ACTIVATE,
        service: services.activate_hazard,
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

export interface IHazardState extends ICommonState<IReducerAction> {
    list? : Array<IHazard>;
    data? : IHazard
}

const defaultState: IHazardState = {
    status: {},
};

export const HazardReducer = (
    state: IHazardState = defaultState,
    action: ICommonAction<IReducerAction>
): IHazardState => {
    switch (action.type) {
        case actionTypes.HAZARD_FETCH_LIST : 
            return {
                ...state,
                list : action.payload.data,
            };

        case actionTypes.HAZARD_FETCH_LIST_ID : 
            return {
                ...state,
                list : action.payload.data,
            };

        case actionTypes.HAZARD_ADD : 
            return {
                ...state,
                data : action.payload.hazard,
            };

        case actionTypes.HAZARD_UPDATE : 
            return {
                ...state,
                data : action.payload.hazard,
            };

        case actionTypes.HAZARD_DEACTIVATE : 
            return {
                ...state,
                data : action.payload.hazard,
            };
        case actionTypes.HAZARD_ACTIVATE : 
            return {
                ...state,
                data : action.payload.hazard,
            };
        default:
            return state;
    }
};

export default ReducerFactory(HazardReducer, defaultState);