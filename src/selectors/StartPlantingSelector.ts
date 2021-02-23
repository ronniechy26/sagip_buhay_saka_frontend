import { IState } from '../ducks';

export const getStartPlantingStatus = ( state: IState): any => state.StartPlantingReducer.status;

export const getStartPlantingActiveStatus = ( state : IState) =>{
    return state.StartPlantingReducer.list?.filter(x => x.is_active === true);
}

