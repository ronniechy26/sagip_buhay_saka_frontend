import {
    ICustomAction,
    ICommonState,
    IReturnPromise,
    ICommonAction,
} from '../ducks';
import ReducerFactory from '../libraries/reducerFactory';
import ThunkFactory from '../libraries/thunkFactory';
import { IFeedback } from '../models/FeedbackModel';
import services from '../services/FeedbackService';

export const actionTypes = {
    FEEDBACK_FETCH_LIST: 'FEEDBACK_FETCH_LIST',
  
} as const;

const thunkActions = {
    fetch_feedbacks : {
        type: actionTypes.FEEDBACK_FETCH_LIST,
        service: services.fetch_feedcbacks,
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

export interface IFeedbackState extends ICommonState<IReducerAction> {
    list? : Array<IFeedback>;
}

const defaultState: IFeedbackState = {
    status: {},
};

export const FeedbackReducer = (
    state: IFeedbackState = defaultState,
    action: ICommonAction<IReducerAction>
): IFeedbackState => {
    switch (action.type) {
        case actionTypes.FEEDBACK_FETCH_LIST : 
            return {
                ...state,
                list : action.payload.data,
            };
        default:
            return state;
    }
};

export default ReducerFactory(FeedbackReducer, defaultState);