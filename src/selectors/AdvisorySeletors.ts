import { IState } from '../ducks';

export const getAdvisoryStatus = ( state: IState): any => state.AdvisoryReducer.status;

