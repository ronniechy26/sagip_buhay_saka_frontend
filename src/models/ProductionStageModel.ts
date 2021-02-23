import * as yup from 'yup';

export const ProductionStageSchema = yup.object({
    id : yup.string(),
    production_stage_name: yup.string().required(),
    is_active: yup.boolean(),
    created_at: yup.string().nullable().notRequired(),
    updated_at: yup.string().nullable().notRequired(),
    created_by: yup.string().nullable().notRequired(),
    created_by_last_name: yup.string().nullable().notRequired(),
    created_by_first_name: yup.string().nullable().notRequired(),
}).defined();

export const ProductionStageListPayloadSchema = yup.object({
    data : yup.array().of(ProductionStageSchema.clone())
});

export type IProductionStage = yup.InferType<typeof ProductionStageSchema>;

export const ProductionStageAddEditSchema = yup.object({
    production_stage_type : ProductionStageSchema
})