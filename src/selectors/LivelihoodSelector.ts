import { IState } from '../ducks';

export const getLivelihoodStatus = ( state: IState): any => state.LivelihoodReducer.status;

export const getLivelihoodActiveStatus = ( state : IState) =>{
    return state.LivelihoodReducer.list?.filter(x => x.is_active === true);
}

