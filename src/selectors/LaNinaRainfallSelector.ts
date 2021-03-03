import { IState } from '../ducks';

export const getLaNinaRainfallStatus = ( state: IState): any => state.LaNinaRainfallReducer.status;

