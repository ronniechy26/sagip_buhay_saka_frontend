import httpClient from '../libraries/httpClient';
import { 
   FeedbackListPayloadSchema
} from '../models/FeedbackModel';

export const client = httpClient();

const services = {
    fetch_feedcbacks: async () => {
        return await client.get('/api/feedbacks', {} , FeedbackListPayloadSchema );
    },
};

export type IFeedbackService = typeof services[keyof typeof services];

export default services;