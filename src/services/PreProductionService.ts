import httpClient from '../libraries/httpClient';
import { 
    PreProductionListPayloadSchema,
    PreProductionAddEditSchema,
    IPreProduction
} from '../models/PreProductionModel';

export const client = httpClient();

const services = {
    fetch_pre_productions: async () => {
        return await client.get('/api/pre_production_types', {} , PreProductionListPayloadSchema);
    },
    add_pre_production: async (data : IPreProduction) => {
        return await client.post('/api/pre_production_type', data, PreProductionAddEditSchema);
    },
    update_pre_production: async (data : IPreProduction, id : string) => {
        return await client.put(`/api/pre_production_type/${id}`, data, PreProductionAddEditSchema);
    },
    deactivate_pre_production: async (id : string) => {
        return await client.put(`api/pre_production_type/deactivate/${id}`, {}, PreProductionAddEditSchema);
    },
    activate_pre_production: async (id : string) => {
        return await client.put(`api/pre_production_type/activate/${id}`, {}, PreProductionAddEditSchema);
    },
};

export type IPreProductionService = typeof services[keyof typeof services];

export default services;