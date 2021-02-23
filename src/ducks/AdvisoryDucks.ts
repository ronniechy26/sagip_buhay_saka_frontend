import {
    ICustomAction,
    ICommonState,
    IReturnPromise,
    ICommonAction,
} from '../ducks';
import ReducerFactory from '../libraries/reducerFactory';
import ThunkFactory from '../libraries/thunkFactory';
import { IAdvisory } from '../models/AdvisoryModel';
import services from '../services/AdvisoryService';

export const actionTypes = {
    ADVISORIES_FETCH_LIST: 'ADVISORIES_FETCH_LIST',
    ADVISORIES_ADD_10DAY : 'ADVISORIES_ADD_10DAY',
    ADVISORIES_ADD_EMERGENCY : 'ADVISORIES_ADD_EMERGENCY',
    ADVISORIES_ADD_GALE_WARNING: 'ADVISORIES_ADD_GALE_WARNING',
    ADVISORIES_ADD_SEASONAL : 'ADVISORIES_ADD_SEASONAL',
    ADVISORIES_ADD_TROPICAL_CYCLONE : 'ADVISORIES_ADD_TROPICAL_CYCLONE',
    ADVISORIES_ADD_OTHER_WEATHER : 'ADVISORIES_ADD_OTHER_WEATHER',
 
} as const;

const thunkActions = {
    fetch_advisories : {
        type: actionTypes.ADVISORIES_FETCH_LIST,
        service: services.fetch_advisories,
    },
    add_10_day : {
        type: actionTypes.ADVISORIES_ADD_10DAY,
        service: services.add_10_day,
    },
    add_emergency : {
        type: actionTypes.ADVISORIES_ADD_EMERGENCY,
        service: services.add_emergency,
    },
    add_gale_warning : {
        type: actionTypes.ADVISORIES_ADD_GALE_WARNING,
        service: services.add_gale_warning,
    },
    add_seasonal : {
        type: actionTypes.ADVISORIES_ADD_SEASONAL,
        service: services.add_seasonal,
    },
    add_tropical_cyclone : {
        type: actionTypes.ADVISORIES_ADD_TROPICAL_CYCLONE,
        service: services.add_tropical_cyclone,
    },
    add_other_weather : {
        type: actionTypes.ADVISORIES_ADD_OTHER_WEATHER,
        service: services.add_other_weather,
    }
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

export interface IAdvisoryState extends ICommonState<IReducerAction> {
    list? : Array<IAdvisory>;
    data? : IAdvisory
}

const defaultState: IAdvisoryState = {
    status: {},
};

export const AdvisoryReducer = (
    state: IAdvisoryState = defaultState,
    action: ICommonAction<IReducerAction>
): IAdvisoryState => {
    switch (action.type) {
        case actionTypes.ADVISORIES_FETCH_LIST : 
            return {
                ...state,
                list : action.payload.data,
            };

        default:
            return state;
    }
};

export default ReducerFactory(AdvisoryReducer, defaultState);