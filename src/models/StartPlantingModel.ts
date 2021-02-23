import * as yup from 'yup';

export const StartPlantingSchema = yup.object({
    id : yup.string(),
    start_planting_name: yup.string().required(),
    is_active: yup.boolean(),
    created_at: yup.string().nullable().notRequired(),
    updated_at: yup.string().nullable().notRequired(),
    created_by: yup.string().nullable().notRequired(),
    created_by_last_name: yup.string().nullable().notRequired(),
    created_by_first_name: yup.string().nullable().notRequired(),
}).defined();

export const StartPlantingListPayloadSchema = yup.object({
    data : yup.array().of(StartPlantingSchema.clone())
});

export type IStartPlanting = yup.InferType<typeof StartPlantingSchema>;

export const StartPlantingAddEditSchema = yup.object({
    start_planting_type : StartPlantingSchema
})