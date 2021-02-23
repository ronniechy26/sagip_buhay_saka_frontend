import { IState } from '../ducks';

export const getActualRainfallStatus = ( state: IState): any => state.ActualRainfallReducer.status;

