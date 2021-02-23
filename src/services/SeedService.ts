import httpClient from '../libraries/httpClient';
import { 
 SeedSchemaListPayloadSchema,
 ISeed,
 SeedAddEditSchema
} from '../models/SeedModel';

export const client = httpClient();

const services = {
    fetch_seeds: async () => {
        return await client.get('/api/seed_types', {} , SeedSchemaListPayloadSchema);
    },
    add_seed: async (data : ISeed) => {
        return await client.post('/api/seed_type', data, SeedAddEditSchema);
    },
    update_seed: async (data : ISeed, id : string) => {
        return await client.put(`/api/seed_type/${id}`, data, SeedAddEditSchema);
    },
    deactivate_seed: async (id : string) => {
        return await client.put(`api/seed_type/deactivate/${id}`, {}, SeedAddEditSchema);
    },
    activate_seed: async (id : string) => {
        return await client.put(`api/seed_type/activate/${id}`, {}, SeedAddEditSchema);
    },
};

export type ISeedService = typeof services[keyof typeof services];

export default services;