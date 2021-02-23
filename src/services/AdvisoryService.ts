import httpClient from '../libraries/httpClient';
import { 
    AdvisorySchemaListPayloadSchema,
    AdvisoryAddEditSchema,
    IAdvisory,
    EmergencyAdvisorySchemaListPayloadSchema,
    SeasonalAdvisorySchemaListPayloadSchema,
    GaleAdvisorySchemaListPayloadSchema,
    IEmergencyAdvisory,
    EmergencyAdvisoryAddEditSchema,
    GaleAdvisoryAddEditSchema,
    IGaleAdvisory,
    SeasonalAdvisoryAddEditSchema,
    ISeasonalAdvisory,
    TropicalCycloneAdvisorySchemaListPayloadSchema,
    OtherWeatherAdvisoryListPayloadSchema,
    ITropicalCycloneAdvisory,
    TropicalCycloneAddEditSchema,
    IOtherWeatherAdvisory,
    OtherWeatherAddEditSchema
} from '../models/AdvisoryModel';

export const client = httpClient();

const services = {
    fetch_advisories: async (type : string) => {
        switch (type) {
            case '10_day_weather':
                return await client.get('/api/advisories', {} , AdvisorySchemaListPayloadSchema );
            case 'emergency' : 
                return await client.get('/api/emergency_advisories', {} , EmergencyAdvisorySchemaListPayloadSchema );
            case 'seasonal' : 
                return await client.get('/api/seasonal_advisories', {} , SeasonalAdvisorySchemaListPayloadSchema );
            case 'gale_warning' : 
                return await client.get('/api/gale_warning_advisories', {} , GaleAdvisorySchemaListPayloadSchema );
            case 'tropical_cyclone' :
                return await client.get('/api/tropical_cyclone_advisories', {} , TropicalCycloneAdvisorySchemaListPayloadSchema);
            case 'other_weather_system' : 
                return await client.get('/api/other_weather_advisories', {} , OtherWeatherAdvisoryListPayloadSchema);
            default:
                break;
        }
    },
    add_10_day: async (data : IAdvisory) => {
        return await client.post('/api/advisory', data , AdvisoryAddEditSchema );
    },
    add_emergency : async (data : IEmergencyAdvisory) => {
        return await client.post('/api/emergency_advisory', data , EmergencyAdvisoryAddEditSchema );
    },
    add_gale_warning : async (data : IGaleAdvisory) => {
        return await client.post('/api/gale_warning_advisory', data , GaleAdvisoryAddEditSchema );
    },
    add_seasonal : async (data : ISeasonalAdvisory) => {
        return await client.post('/api/seasonal_advisory', data , SeasonalAdvisoryAddEditSchema );
    },
    add_tropical_cyclone : async (data : ITropicalCycloneAdvisory) => {
        return await client.post('/api/tropical_cyclone_advisory', data , TropicalCycloneAddEditSchema );
    },
    add_other_weather : async (data : IOtherWeatherAdvisory) => {
        return await client.post('/api/other_weather_advisory', data , OtherWeatherAddEditSchema );
    }

};

export type IAdvisoriesService = typeof services[keyof typeof services];

export default services;