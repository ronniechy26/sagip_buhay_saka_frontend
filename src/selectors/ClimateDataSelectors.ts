import { IState } from '../ducks';

export const getClimateDataStatus = ( state: IState): any => state.ClimateDataReducer.status;

