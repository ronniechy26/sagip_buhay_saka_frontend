import * as yup from 'yup';

export const DasboardRainfallSchema = yup.object({
    month: yup.string(),
    normal: yup.number(),
    el_nino: yup.number(),
    la_nina: yup.number(),
    actual: yup.number(),
    forecast:yup.number(),
}).defined();

export const DasboardRainfallListSchema = yup.object({
    data : yup.array().of(DasboardRainfallSchema.clone())
});

export type IDashboardRainfall= yup.InferType<typeof DasboardRainfallSchema>;