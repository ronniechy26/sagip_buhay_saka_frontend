import { combineReducers } from 'redux';

import { TYPE_FETCHING, TYPE_FETCHED, TYPE_ERROR } from '../constants';
import UserReducer from '../ducks/UserDuck';
import RecipientReducer from '../ducks/ReicipientDuck';
import LivelihoodReducer from '../ducks/LivelihoodDucks';
import RiskReducer from '../ducks/RiskDucks';
import ProductionStageReducer from '../ducks/ProductionStageDucks';
import SeedReducer from '../ducks/SeedDucks';
import PreProductionReducer from '../ducks/PreProductionDucks';
import StartPlantingReducer from '../ducks/StartPlantingDucks';
import AdvisoryReducer from '../ducks/AdvisoryDucks';
import ActualRainfallReducer from '../ducks/ActualRainfallDucks';
import NormalRainfallReducer from '../ducks/NormalRainfallDucks';
import FeedbackReducer from '../ducks/FeedbackDucks';
import LaNinaRainfallReducer from '../ducks/LaNinaRainfallDucks';

export interface IStatus {
    error: any;
    fetching: boolean;
}

export type IThunkStatus<T> = {
    [key in keyof T]?: IStatus;
};

export interface ICustomAction<C, P = never, S = never> {
    type: C;
    payload?: P;
    status: S;
}
export type ICommonState<T> = { status: IThunkStatus<T> };
export type ICommonAction<T> = T;

export type IAsyncAction<C, T> =
    | ICustomAction<C, never, TYPE_FETCHING>
    | ICustomAction<C, T, TYPE_FETCHED>
    | ICustomAction<C, Error, TYPE_ERROR>;

export type IReturnPromise<T> = T extends Promise<infer U> ? U : T;

export const reducersList = {
    UserReducer,
    RecipientReducer,
    LivelihoodReducer,
    RiskReducer,
    ProductionStageReducer,
    SeedReducer,
    PreProductionReducer,
    StartPlantingReducer,
    AdvisoryReducer,
    ActualRainfallReducer,
    NormalRainfallReducer,
    FeedbackReducer,
    LaNinaRainfallReducer
};
export type IReducer = {
    [key in keyof typeof reducersList]: typeof reducersList[keyof typeof reducersList];
};

export type IState = ReturnType<typeof reducers>;
export const reducers = combineReducers(reducersList);

export default reducers;
