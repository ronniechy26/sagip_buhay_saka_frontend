import httpClient from '../libraries/httpClient';
import { 
    UserSchema, 
    UserLoginSchema , 
    UsersListPayloadSchema, 
    IUser, 
    UserAddEditSchema
} from '../models/UserModel';

export const client = httpClient();

const services = {
    login: async (data : {username : string, password : string}) => {
        return await client.post('/api/login', data, UserLoginSchema);
    },
    fetch_user  : async(id : string) =>{
        return await client.get(`api/user/${id}`,{}, UserSchema);
    },
    fetch_users  : async (params : any) =>{
        return await client.get(`api/users`, params, UsersListPayloadSchema);
    },
    deactivate_user : async (id : string) =>{
        return await client.put(`api/user/deactivate/${id}`, {}, UsersListPayloadSchema);
    },
    activate_user : async (id : string) =>{
        return await client.put(`api/user/activate/${id}`, {}, UsersListPayloadSchema);
    },
    add_user : async (user : IUser) =>{
        return await client.post(`api/user`, user, UserAddEditSchema);
    },
    update_user : async (user : IUser, id : string) =>{
        return await client.put(`api/user/${id}`,user, UserAddEditSchema);
    },
    update_credit : async (id : string, data : any) =>{
        return await client.put(`api/user/update_credits/${id}`, data, UserAddEditSchema);
    },
};

export type IUserService = typeof services[keyof typeof services];

export default services;
