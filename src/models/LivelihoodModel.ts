import * as yup from 'yup';

export const LivelihoodSchema = yup.object({
    id : yup.string(),
    livelihood_name: yup.string().required(),
    is_active: yup.boolean(),
    created_at: yup.string().nullable().notRequired(),
    updated_at: yup.string().nullable().notRequired(),
    created_by: yup.string().nullable().notRequired(),
    created_by_last_name: yup.string().nullable().notRequired(),
    created_by_first_name: yup.string().nullable().notRequired(),
    production_stage : yup.array().of(yup.string()).nullable(),
    risk : yup.array().of(yup.string()).nullable(),
    advice : yup.array().of(yup.string()).nullable(),
}).defined();

export const LivelihoodSchemaListPayloadSchema = yup.object({
    data : yup.array().of(LivelihoodSchema.clone())
});

export type ILivelihood = yup.InferType<typeof LivelihoodSchema>;

export const LivelihoodAddEditSchema = yup.object({
    livelihood_type : LivelihoodSchema
})