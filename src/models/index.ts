import * as yup from 'yup';

export const PaginationSchema = yup.object({
    sort: yup.string(),
    filter: yup.string(),
    page: yup.number(),
    take: yup.number(),
    skip: yup.number().strip(true),
    q: yup.string().nullable(),
});

export const MetaSchema = yup.object({
    // filters: yup.object({
    //     type: yup.string().nullable(),
    //     status: yup.string().nullable(),
    // }),
    sort_dir: yup.mixed().oneOf(['asc', 'desc']),
    sort_key: yup.string(),
    page: yup.number(),
    take: yup.number(),
    total: yup.number(),
    q: yup.string().nullable(),
});

export type IPagination = Partial<yup.InferType<typeof PaginationSchema>>;
export type IMeta = yup.InferType<typeof MetaSchema>;

export const EmptyResponseSchema = yup.string().ensure();