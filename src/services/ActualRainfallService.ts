import httpClient from '../libraries/httpClient';
import { 
    ActualRainfallSchemaListPayloadSchema,
    ActualRainfallAddEditSchema,
    IActualRainfall
} from '../models/ActualRainfallModel';

export const client = httpClient();

const services = {
    fetch_actual_rainfall: async () => {
        return await client.get('/api/actual_rainfall', {} , ActualRainfallSchemaListPayloadSchema );
    },
    add_actual_rainfall: async (data : IActualRainfall) => {
        return await client.post('/api/actual_rainfall', data , ActualRainfallAddEditSchema );
    },
    read_actual_rainfall: async (id : string) => {
        return await client.get(`/api/actual_rainfall/${id}`, {} , ActualRainfallAddEditSchema );
    },
    update_actual_rainfall: async (id : string, data : IActualRainfall) => {
        return await client.put(`/api/actual_rainfall/${id}`, data , ActualRainfallAddEditSchema );
    },
};

export type IActualRainfallService = typeof services[keyof typeof services];

export default services;