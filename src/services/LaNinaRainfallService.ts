import httpClient from '../libraries/httpClient';
import { 
    LaNinaRainfallAddEditSchema,
    ILaNinaRainfall
} from '../models/LaNinaRainfallModel';

export const client = httpClient();

const services = {
    read_la_nina_rainfall: async () => {
        return await client.get(`/api/la_nina_rainfall/1`, {} , LaNinaRainfallAddEditSchema );
    },
    update_la_nina_rainfall: async (data : ILaNinaRainfall) => {
        return await client.put(`/api/la_nina_rainfall/1`, data, LaNinaRainfallAddEditSchema );
    },
};

export type ILaNinaRainfallService = typeof services[keyof typeof services];

export default services;