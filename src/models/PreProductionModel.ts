import * as yup from 'yup';

export const PreProductionSchema = yup.object({
    id : yup.string(),
    pre_production_name : yup.string().required(),
    is_active: yup.boolean(),
    created_at: yup.string().nullable().notRequired(),
    updated_at: yup.string().nullable().notRequired(),
    created_by: yup.string().nullable().notRequired(),
    created_by_last_name: yup.string().nullable().notRequired(),
    created_by_first_name: yup.string().nullable().notRequired(),
}).defined();

export const PreProductionListPayloadSchema = yup.object({
    data : yup.array().of(PreProductionSchema.clone())
});

export type IPreProduction = yup.InferType<typeof PreProductionSchema>;

export const PreProductionAddEditSchema = yup.object({
    pre_production_type : PreProductionSchema
})