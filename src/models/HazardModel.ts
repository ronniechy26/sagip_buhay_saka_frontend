import * as yup from 'yup';

export const HazardSchema = yup.object({
    id : yup.string(),
    hazard: yup.string().required(),
    risk: yup.string().required(),
    advisory: yup.string().required(),
    is_active: yup.boolean(),
    created_at: yup.string().nullable().notRequired(),
    updated_at: yup.string().nullable().notRequired(),
    created_by: yup.string().nullable().notRequired(),
    created_by_last_name: yup.string().nullable().notRequired(),
    created_by_first_name: yup.string().nullable().notRequired(),
}).defined();

export const HazardSchemaListPayloadSchema = yup.object({
    data : yup.array().of(HazardSchema.clone())
});

export type IHazard = yup.InferType<typeof HazardSchema>;

export const HazardAddEditSchema = yup.object({
    hazard : HazardSchema
})