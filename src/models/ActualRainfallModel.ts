import * as yup from 'yup';

export const ActualRainfallSchema = yup.object({
    id : yup.string(),
    created_at: yup.string().nullable().notRequired(),
    updated_at: yup.string().nullable().notRequired(),
    year: yup.string(),
    january: yup.string(),
    february: yup.string(),
    march: yup.string(),
    april: yup.string(),
    may: yup.string(),
    june: yup.string(),
    july: yup.string(),
    august: yup.string(),
    september: yup.string(),
    october: yup.string(),
    november: yup.string(),
    december:yup.string(),
}).defined();

export const ActualRainfallSchemaListPayloadSchema = yup.object({
    data : yup.array().of(ActualRainfallSchema.clone())
});

export type IActualRainfall= yup.InferType<typeof ActualRainfallSchema>;

export const ActualRainfallAddEditSchema = yup.object({
    actual_rainfall : ActualRainfallSchema
})