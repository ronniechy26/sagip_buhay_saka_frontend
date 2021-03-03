import httpClient from '../libraries/httpClient';
import { 
    ElNinoRainfallAddEditSchema,
    IElNinoRainfall
} from '../models/ElNinoRainfallModel';

export const client = httpClient();

const services = {
    read_el_nino_rainfall: async () => {
        return await client.get(`/api/el_nino_rainfall/1`, {} , ElNinoRainfallAddEditSchema );
    },
    update_el_nino_rainfall: async (data : IElNinoRainfall) => {
        return await client.put(`/api/el_nino_rainfall/1`, data, ElNinoRainfallAddEditSchema );
    },
};

export type IElNinoRainfallService = typeof services[keyof typeof services];

export default services;