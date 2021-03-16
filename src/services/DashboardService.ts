import httpClient from '../libraries/httpClient';
import { 
   DasboardRainfallListSchema,
} from '../models/DashboardModel';

export const client = httpClient();

const services = {
    get_dashboard_rainfall: async () => {
        return await client.get(`/api/dashboard/rainfall`, {} , DasboardRainfallListSchema );
    },
};

export type IDashboardService = typeof services[keyof typeof services];

export default services;