import httpClient from "../libraries/httpClient";
import {
  HazardAddEditSchema,
  HazardSchemaListPayloadSchema,
  IHazard,
} from "../models/HazardModel";

export const client = httpClient();

const services = {
  fetch_hazards: async () => {
    return await client.get("/api/hazards", {},  HazardSchemaListPayloadSchema,
    );
  },
  fetch_hazards_id: async (id :string) => {
    return await client.get(`/api/hazards/${id}`, {},  HazardSchemaListPayloadSchema,
    );
  },
  add_hazard: async (data: IHazard) => {
    return await client.post("/api/hazard", data, HazardAddEditSchema);
  },
  update_hazard: async (data: IHazard, id: string) => {
    return await client.put(`/api/hazard/${id}`, data, HazardAddEditSchema);
  },
  deactivate_hazard: async (id: string) => {
    return await client.put(
      `api/hazard/deactivate/${id}`,
      {},
      HazardAddEditSchema
    );
  },
  activate_hazard: async (id: string) => {
    return await client.put(
      `api/hazard/activate/${id}`,
      {},
      HazardAddEditSchema
    );
  },
};

export type IHazardService = typeof services[keyof typeof services];

export default services;
