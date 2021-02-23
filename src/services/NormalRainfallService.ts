import httpClient from '../libraries/httpClient';
import { 
    NormalRainfallAddEditSchema,
    INormalRainfall
} from '../models/NormalRainfallModel';

export const client = httpClient();

const services = {
    read_normal_rainfall: async () => {
        return await client.get(`/api/normal_rainfall/1`, {} , NormalRainfallAddEditSchema );
    },
    update_normal_rainfall: async (data : INormalRainfall) => {
        return await client.put(`/api/normal_rainfall/1`, data, NormalRainfallAddEditSchema );
    },
};

export type INormalRainfallService = typeof services[keyof typeof services];

export default services;