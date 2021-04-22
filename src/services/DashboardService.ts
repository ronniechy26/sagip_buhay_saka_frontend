import httpClient from '../libraries/httpClient';
import { 
   DasboardRainfallListSchema,
} from '../models/DashboardModel';

export const client = httpClient();

const services = {
    get_dashboard_rainfall: async (id : number) => {
        return await client.get(`/api/dashboard/rainfall?lgu_id=${id}`, {}  , DasboardRainfallListSchema );
    },
    get_dashboard_min_temp: async (id : number) => {
        return await client.get(`/api/dashboard/min_temp?lgu_id=${id}`, {}  , DasboardRainfallListSchema );
    },
    get_dashboard_mean_temp: async (id : number) => {
        return await client.get(`/api/dashboard/mean_temp?lgu_id=${id}`, {}  , DasboardRainfallListSchema );
    },
    get_dashboard_max_temp: async (id : number) => {
        return await client.get(`/api/dashboard/max_temp?lgu_id=${id}`, {}  , DasboardRainfallListSchema );
    },
};

export type IDashboardService = typeof services[keyof typeof services];

export default services;