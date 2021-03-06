import * as yup from 'yup';

export const NormalRainfallSchema = yup.object({
    id : yup.string(),
    created_at: yup.string().nullable().notRequired(),
    updated_at: yup.string().nullable().notRequired(),
    start_year: yup.string(),
    end_year: yup.string(),
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

export const NormalRainfallSchemaListPayloadSchema = yup.object({
    data : yup.array().of(NormalRainfallSchema.clone())
});

export type INormalRainfall= yup.InferType<typeof NormalRainfallSchema>;

export const NormalRainfallAddEditSchema = yup.object({
    normal_rainfall : NormalRainfallSchema
})