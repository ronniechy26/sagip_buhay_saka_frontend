import { IState } from '../ducks';

export const getNormalRainfallStatus = ( state: IState): any => state.NormalRainfallReducer.status;

