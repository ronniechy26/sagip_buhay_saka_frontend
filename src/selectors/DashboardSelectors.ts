import { IState } from '../ducks';

export const getDashboardStatus = ( state: IState): any => state.DashboardReducer.status;