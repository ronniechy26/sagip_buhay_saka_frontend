import httpClient from '../libraries/httpClient';
import { 
    LivelihoodSchemaListPayloadSchema,
    LivelihoodAddEditSchema,
    ILivelihood
} from '../models/LivelihoodModel';

export const client = httpClient();

const services = {
    fetch_livelihoods: async () => {
        return await client.get('/api/livelihood_types', {} , LivelihoodSchemaListPayloadSchema);
    },
    add_livelihood: async (data : ILivelihood) => {
        return await client.post('/api/livelihood_type', data, LivelihoodAddEditSchema);
    },
    update_livelihood: async (data : ILivelihood, id : string) => {
        return await client.put(`/api/livelihood_type/${id}`, data, LivelihoodAddEditSchema);
    },
    deactivate_livelihood: async (id : string) => {
        return await client.put(`api/livelihood_type/deactivate/${id}`, {}, LivelihoodAddEditSchema);
    },
    activate_livelihood: async (id : string) => {
        return await client.put(`api/livelihood_type/activate/${id}`, {}, LivelihoodAddEditSchema);
    },
};

export type ILivelihoodService = typeof services[keyof typeof services];

export default services;