import httpClient from '../libraries/httpClient';
import { 
    ClimateDataAddEditSchema,
    ClimateDataListPayloadSchema,
    IClimateData
} from '../models/ClimateDataModel';

export const client = httpClient();

const services = {
    fetch_climate_data: async () => {
        return await client.get('/api/climate_datas', {} , ClimateDataListPayloadSchema );
    },
    add_climate_data: async (data : IClimateData) => {
        return await client.post('/api/climate_data', data , ClimateDataAddEditSchema );
    },
    read_climate_data: async (id : string) => {
        return await client.get(`/api/climate_data/${id}`, {} , ClimateDataAddEditSchema );
    },
    update_climate_data: async (id : string, data : IClimateData) => {
        return await client.put(`/api/climate_data/${id}`, data , ClimateDataAddEditSchema );
    },
};

export type IClimateDataService = typeof services[keyof typeof services];

export default services;