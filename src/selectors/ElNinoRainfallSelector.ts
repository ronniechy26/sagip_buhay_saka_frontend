import { IState } from '../ducks';

export const getElNinoRainfallStatus = ( state: IState): any => state.ElNinoRainfallReducer.status;

