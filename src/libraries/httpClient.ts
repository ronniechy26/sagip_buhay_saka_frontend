import axios, { AxiosRequestConfig } from 'axios';
import * as yup from 'yup';
import * as dotenv from 'dotenv';

dotenv.config();

export const httpClient = () => () => {
    const base = process.env.REACT_APP_API_ENDPOINT;

    const r = axios.create({
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*',
            // 'X-Requested-With': 'XMLHttpRequest', // Needed for mockaroo
            // 'X-API-Key': process.env.API_KEY, // Needed for mockaroo
        },
        transformRequest: [
            (data, headers) => {
                if (axios.defaults.headers.common.Authorization) {
                    headers['Authorization'] =
                        axios.defaults.headers.common.Authorization;
                }

                if (data instanceof FormData) {
                    return data;
                }

                return JSON.stringify(data);
            },
        ],
        baseURL: base,
        withCredentials: false, // false if local
    });

    /**
     * @source https://github.com/jquense/yup#mixedvalidatevalue-any-options-object-promiseany-validationerror
     */
    return {
        post: async <D, S extends yup.ObjectSchema>(
            url: string,
            data: D,
            schema: S,
            config?: AxiosRequestConfig
        ): Promise<any> => {
            const response = await r.post(url, data, config);
            return schema.validate(response.data, {
                stripUnknown: true,
            });
        },

        get: async <D, S extends yup.ObjectSchema>(
            url: string,
            data: D,
            schema: S
        ): Promise<any> => {
            const response = await r.get(url, { params: data });
            return schema.validate(response.data, {
                // recursive: false,
                stripUnknown: true,
            });
        },

        put: async <D, S extends yup.ObjectSchema>(
            url: string,
            data: D,
            schema: S,

            config?: AxiosRequestConfig
        ): Promise<any> => {
            const response = await r.put(url, data, config);
            return schema.validate(response.data, {
                stripUnknown: true,
            });
        },

        delete: async <D, S extends yup.ObjectSchema>(
            url: string,
            data: D,
            schema: S
        ): Promise<any> => {
            const response = await r.delete(url, data);
            return schema.validate(response.data, {
                stripUnknown: true,
            });
        },
    };
};

export default httpClient();
