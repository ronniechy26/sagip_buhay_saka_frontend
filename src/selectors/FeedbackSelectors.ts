import { IState } from '../ducks';

export const getFeedbackStatus = ( state: IState): any => state.FeedbackReducer.status;

