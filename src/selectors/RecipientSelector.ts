import { IState, IStatus } from '../ducks';
import { IReducerAction } from '../ducks/ReicipientDuck';

export const getRecipientStatus = (
    state: IState,
    action : IReducerAction['type']
): any => state.RecipientReducer.status

