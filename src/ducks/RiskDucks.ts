import {
    ICustomAction,
    ICommonState,
    IReturnPromise,
    ICommonAction,
} from '../ducks';
import ReducerFactory from '../libraries/reducerFactory';
import ThunkFactory from '../libraries/thunkFactory';
import { IRisk} from '../models/RiskModel';
import services from '../services/RiskService';

export const actionTypes = {
    RISK_FETCH_LIST: 'RISK_FETCH_LIST',
    RISK_ADD : 'RISK_ADD',
    RISK_UPDATE : 'RISK_UPDATE',
    RISK_DEACTIVATE : 'RISK_DEACTIVATE',
    RISK_ACTIVATE : 'RISK_ACTIVATE'
} as const;

const thunkActions = {
    fetch_risks : {
        type: actionTypes.RISK_FETCH_LIST,
        service: services.fetch_risks,
    },
    add_risk : {
        type: actionTypes.RISK_ADD,
        service: services.add_risk,
    },
    update_risk : {
        type: actionTypes.RISK_UPDATE,
        service: services.update_risk,
    },
    deactivate_risk : {
        type: actionTypes.RISK_DEACTIVATE,
        service: services.deactivate_risk,
    },
    activate_risk : {
        type: actionTypes.RISK_ACTIVATE,
        service: services.activate_risk,
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

export interface IRiskState extends ICommonState<IReducerAction> {
    list? : Array<IRisk>;
    data? : IRisk
}

const defaultState: IRiskState = {
    status: {},
};

export const RiskReducer = (
    state: IRiskState = defaultState,
    action: ICommonAction<IReducerAction>
): IRiskState => {
    switch (action.type) {
        case actionTypes.RISK_FETCH_LIST : 
            return {
                ...state,
                list : action.payload.data,
            };

        case actionTypes.RISK_ADD : 
            return {
                ...state,
                data : action.payload.risk_type,
            };

        case actionTypes.RISK_UPDATE : 
            return {
                ...state,
                data : action.payload.risk_type,
            };

        case actionTypes.RISK_DEACTIVATE : 
            return {
                ...state,
                data : action.payload.risk_type,
            };
        case actionTypes.RISK_ACTIVATE : 
            return {
                ...state,
                data : action.payload.risk_type,
            };
        default:
            return state;
    }
};

export default ReducerFactory(RiskReducer, defaultState);