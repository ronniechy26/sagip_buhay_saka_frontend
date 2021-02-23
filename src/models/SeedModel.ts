import * as yup from 'yup';

export const SeedSchema = yup.object({
    id : yup.string(),
    seed_name: yup.string().required(),
    is_active: yup.boolean(),
    created_at: yup.string().nullable().notRequired(),
    updated_at: yup.string().nullable().notRequired(),
    created_by: yup.string().nullable().notRequired(),
    created_by_last_name: yup.string().nullable().notRequired(),
    created_by_first_name: yup.string().nullable().notRequired(),
}).defined();

export const SeedSchemaListPayloadSchema = yup.object({
    data : yup.array().of(SeedSchema.clone())
});

export type ISeed = yup.InferType<typeof SeedSchema>;

export const SeedAddEditSchema = yup.object({
    seed_type : SeedSchema
})