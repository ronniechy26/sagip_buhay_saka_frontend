import httpClient from '../libraries/httpClient';
import { 
 StartPlantingListPayloadSchema,
 IStartPlanting,
 StartPlantingAddEditSchema
} from '../models/StartPlantingModel';

export const client = httpClient();

const services = {
    fetch_start_plantings: async () => {
        return await client.get('/api/start_planting_types', {} , StartPlantingListPayloadSchema);
    },
    add_start_planting: async (data : IStartPlanting) => {
        return await client.post('/api/start_planting_type', data, StartPlantingAddEditSchema);
    },
    update_start_planting: async (data : IStartPlanting, id : string) => {
        return await client.put(`/api/start_planting_type/${id}`, data, StartPlantingAddEditSchema);
    },
    deactivate_start_planting: async (id : string) => {
        return await client.put(`api/start_planting_type/deactivate/${id}`, {}, StartPlantingAddEditSchema);
    },
    activate_start_planting: async (id : string) => {
        return await client.put(`api/start_planting_type/activate/${id}`, {}, StartPlantingAddEditSchema);
    },
};

export type IStartPlantingService = typeof services[keyof typeof services];

export default services;