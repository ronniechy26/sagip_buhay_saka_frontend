import * as yup from 'yup';

export const RiskSchema = yup.object({
    id : yup.string(),
    risk_name: yup.string().required(),
    is_active: yup.boolean(),
    created_at: yup.string().nullable().notRequired(),
    updated_at: yup.string().nullable().notRequired(),
    created_by: yup.string().nullable().notRequired(),
    created_by_last_name: yup.string().nullable().notRequired(),
    created_by_first_name: yup.string().nullable().notRequired(),
}).defined();

export const RiskSchemaListPayloadSchema = yup.object({
    data : yup.array().of(RiskSchema.clone())
});

export type IRisk = yup.InferType<typeof RiskSchema>;

export const RiskAddEditSchema = yup.object({
    risk_type : RiskSchema
})