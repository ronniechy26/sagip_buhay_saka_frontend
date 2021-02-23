import httpClient from '../libraries/httpClient';
import { 
    RecipientListPayloadSchema,
    IRecipient,
    RecipientAddEditSchema
} from '../models/RecipientModel';

export const client = httpClient();

const services = {
    fetch_recipients: async () => {
        return await client.get('/api/recipients', {} , RecipientListPayloadSchema);
    },
    add_recipient: async (recipient : IRecipient) => {
        return await client.post('/api/recipient', recipient, RecipientAddEditSchema);
    },
    read_recipient: async (id : string) => {
        return await client.get(`/api/recipient/${id}`, {}, RecipientAddEditSchema);
    },
    update_recipient: async (id : string, recipient : IRecipient) => {
        return await client.put(`/api/recipient/${id}`, recipient, RecipientAddEditSchema);
    },
    deactivate_recipient: async (id : string) => {
        return await client.put(`api/recipient/deactivate/${id}`, {}, RecipientAddEditSchema);
    },
    activate_recipient: async (id : string) => {
        return await client.put(`api/recipient/activate/${id}`, {}, RecipientAddEditSchema);
    },
};

export type IRecipientService = typeof services[keyof typeof services];

export default services;