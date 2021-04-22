import * as yup from 'yup';

export const DasboardRainfallSchema = yup.object({
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
    weather_parameter: yup.string(),
    data_input: yup.string(),
    lgu_id: yup.number().nullable().notRequired(),
}).defined();

export const DasboardRainfallListSchema = yup.object({
    data : yup.array().of(DasboardRainfallSchema.clone())
});

export type IDashboardRainfall= yup.InferType<typeof DasboardRainfallSchema>;