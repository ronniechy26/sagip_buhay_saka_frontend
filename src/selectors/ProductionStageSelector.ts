import { IState } from '../ducks';

export const getProductionStageStatus = ( state: IState): any => state.ProductionStageReducer.status;

export const getProductionStageActiveStatus = ( state : IState) =>{
    return state.ProductionStageReducer.list?.filter(x => x.is_active === true);
}
