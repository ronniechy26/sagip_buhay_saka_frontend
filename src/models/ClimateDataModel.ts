import * as yup from 'yup';

export const ClimateDataSchema = yup.object({
    id : yup.string(),
    created_at: yup.string().nullable().notRequired(),
    updated_at: yup.string().nullable().notRequired(),
    weather_parameter: yup.string(),
    data_input: yup.string(),
    lgu_id: yup.number().nullable().notRequired(),
    created_by_first_name : yup.string().nullable().notRequired(),
    created_by_last_name : yup.string().nullable().notRequired(),
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

export const ClimateDataListPayloadSchema = yup.object({
    data : yup.array().of(ClimateDataSchema.clone())
});

export type IClimateData= yup.InferType<typeof ClimateDataSchema>;

export const ClimateDataAddEditSchema = yup.object({
    climate_data : ClimateDataSchema
})