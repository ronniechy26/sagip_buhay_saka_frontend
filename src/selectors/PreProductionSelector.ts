import { IState } from '../ducks';

export const getPreProductionStatus = ( state: IState): any => state.PreProductionReducer.status;

export const getPreProductionActiveStatus = ( state : IState) =>{
    return state.PreProductionReducer.list?.filter(x => x.is_active === true);
}
