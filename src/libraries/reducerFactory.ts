import { TYPE_FETCHING, TYPE_FETCHED, TYPE_ERROR } from '../constants';
import { UserReducer, IUserState } from '../ducks/UserDuck';
import { RecipientReducer, IRecipientState} from '../ducks/ReicipientDuck';
import { LivelihoodReducer, ILivelihoodState} from '../ducks/LivelihoodDucks';
import { RiskReducer, IRiskState} from '../ducks/RiskDucks';
import { ProductionStageReducer, IProductionStageState} from '../ducks/ProductionStageDucks';
import { SeedReducer, ISeedState} from '../ducks/SeedDucks';
import { PreProductionReducer, IPreProductionState} from '../ducks/PreProductionDucks';
import { StartPlantingReducer, IStartPlantingState} from '../ducks/StartPlantingDucks'
import { AdvisoryReducer, IAdvisoryState } from '../ducks/AdvisoryDucks';
import { ActualRainfallReducer, IActualRainfallState} from '../ducks/ActualRainfallDucks';
import { NormalRainfallReducer, INormalRainfallState} from '../ducks/NormalRainfallDucks';
import { FeedbackReducer, IFeedbackState } from '../ducks/FeedbackDucks';
import { LaNinaRainfallReducer, ILaNinaRainfallState} from '../ducks/LaNinaRainfallDucks';

export interface IReducerWrapper {
    (reducer: typeof UserReducer, defaultState: IUserState): typeof UserReducer;
    (reducer: typeof RecipientReducer, defaultState: IRecipientState): typeof RecipientReducer;
    (reducer: typeof LivelihoodReducer, defaultState: ILivelihoodState): typeof LivelihoodReducer;
    (reducer: typeof RiskReducer, defaultState: IRiskState): typeof RiskReducer;
    (reducer: typeof ProductionStageReducer, defaultState: IProductionStageState): typeof ProductionStageReducer;
    (reducer: typeof SeedReducer, defaultState: ISeedState): typeof SeedReducer;
    (reducer: typeof PreProductionReducer, defaultState: IPreProductionState): typeof PreProductionReducer;
    (reducer: typeof StartPlantingReducer, defaultState: IStartPlantingState): typeof StartPlantingReducer;
    (reducer: typeof AdvisoryReducer, defaultState: IAdvisoryState): typeof AdvisoryReducer;
    (reducer: typeof ActualRainfallReducer, defaultState: IActualRainfallState): typeof ActualRainfallReducer;
    (reducer: typeof NormalRainfallReducer, defaultState: INormalRainfallState): typeof NormalRainfallReducer;
    (reducer: typeof FeedbackReducer, defaultState: IFeedbackState): typeof FeedbackReducer;
    (reducer: typeof LaNinaRainfallReducer, defaultState: ILaNinaRainfallState): typeof LaNinaRainfallReducer;
}

export const reducerFactory: IReducerWrapper = (reducer, defaultState) => {
    return (state = { ...defaultState, status: {} }, action : any) => {
        switch (action.status) {
            case TYPE_FETCHING:
                return {
                    ...state,
                    status: {
                        ...state.status,
                        [action.type]: {
                            fetching: true,
                            error: null,
                        },
                    },
                };
            case TYPE_FETCHED:
                return {
                    ...reducer(
                        {
                            ...state,
                            status: {
                                ...state.status,
                                [action.type]: {
                                    fetching: false,
                                    error: null,
                                },
                            },
                        },
                        action
                    ),
                };
            case TYPE_ERROR:
                return {
                    ...state,
                    status: {
                        ...state.status,
                        [action.type]: {
                            fetching: false,
                            error: (action.payload as any).message
                                ? (action.payload as any).message
                                : action.payload,
                        },
                    },
                };
            default:
                return {
                    ...state,
                    ...reducer(state, action),
                };
        }
    };
};

export default reducerFactory;
