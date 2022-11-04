import { IState } from '../ducks';

export const getHazardStatus = ( state: IState): any => state.HazardReducer.status;

export const getHazardActiveStatus = ( state : IState) =>{
    return state.HazardReducer.list?.filter(x => x.is_active === true);
}
