import httpClient from '../libraries/httpClient';
import { 
    IProductionStage,
    ProductionStageListPayloadSchema,
    ProductionStageAddEditSchema
} from '../models/ProductionStageModel';

export const client = httpClient();

const services = {
    fetch_production_stage: async () => {
        return await client.get('/api/production_stage_types', {} , ProductionStageListPayloadSchema);
    },
    add_production_stage: async (data : IProductionStage) => {
        return await client.post('/api/production_stage_type', data, ProductionStageAddEditSchema);
    },
    update_production_stage: async (data : IProductionStage, id : string) => {
        return await client.put(`/api/production_stage_type/${id}`, data, ProductionStageAddEditSchema);
    },
    deactivate_production_stage: async (id : string) => {
        return await client.put(`api/production_stage_type/deactivate/${id}`, {}, ProductionStageAddEditSchema);
    },
    activate_production_stage: async (id : string) => {
        return await client.put(`api/production_stage_type/activate/${id}`, {}, ProductionStageAddEditSchema);
    },
};

export type IProductionStageService = typeof services[keyof typeof services];

export default services;