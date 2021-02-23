import { IState } from '../ducks';

export const getSeedStatus = ( state: IState): any => state.SeedReducer.status;

export const getSeedActiveStatus = ( state : IState) =>{
    return state.SeedReducer.list?.filter(x => x.is_active === true);
}
