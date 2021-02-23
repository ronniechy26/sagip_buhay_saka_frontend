import { IState } from '../ducks';

export const getRiskStatus = ( state: IState): any => state.RiskReducer.status;

export const getRiskActiveStatus = ( state : IState) =>{
    return state.RiskReducer.list?.filter(x => x.is_active === true);
}
