import httpClient from '../libraries/httpClient';
import { 
 RiskSchemaListPayloadSchema,
 IRisk,
 RiskAddEditSchema
} from '../models/RiskModel';

export const client = httpClient();

const services = {
    fetch_risks: async () => {
        return await client.get('/api/risk_types', {} , RiskSchemaListPayloadSchema);
    },
    add_risk: async (data : IRisk) => {
        return await client.post('/api/risk_type', data, RiskAddEditSchema);
    },
    update_risk: async (data : IRisk, id : string) => {
        return await client.put(`/api/risk_type/${id}`, data, RiskAddEditSchema);
    },
    deactivate_risk: async (id : string) => {
        return await client.put(`api/risk_type/deactivate/${id}`, {}, RiskAddEditSchema);
    },
    activate_risk: async (id : string) => {
        return await client.put(`api/risk_type/activate/${id}`, {}, RiskAddEditSchema);
    },
};

export type IRiskService = typeof services[keyof typeof services];

export default services;