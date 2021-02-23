import * as yup from 'yup';
//10 day
export const IDatesSchema = yup.object({
    id : yup.string().notRequired(),
    date : yup.string().notRequired(),
    rainfall : yup.string().notRequired(),
    min_temp : yup.string().notRequired(),
    max_temp : yup.string().notRequired(),
    mean_temp : yup.string().notRequired(),
})

export const AdvisorySchema = yup.object({
    id : yup.string(),
    sms_output: yup.string().required(),
    forecast_date: yup.string().nullable().notRequired(),
    forecast_data: yup.array().of(IDatesSchema).nullable().notRequired(),
    created_at: yup.string().nullable().notRequired(),
    updated_at: yup.string().nullable().notRequired(),
    sent_by: yup.string().nullable().notRequired(),
    sent_by_last_name: yup.string().nullable().notRequired(),
    sent_by_first_name: yup.string().nullable().notRequired(),
}).defined();

export const AdvisorySchemaListPayloadSchema = yup.object({
    data : yup.array().of(AdvisorySchema.clone())
});

export type IAdvisory = yup.InferType<typeof AdvisorySchema>;

export const AdvisoryAddEditSchema = yup.object({
    advisory : AdvisorySchema
})

//emergency
export const EmergencyAdvisorySchema = yup.object({
    id : yup.string(),
    sms_output: yup.string().required(),
    forecast_date: yup.string().nullable().notRequired(),
    created_at: yup.string().nullable().notRequired(),
    updated_at: yup.string().nullable().notRequired(),
    tropical_cyclone : yup.string().nullable().notRequired(),
    other_emergencies: yup.string().nullable().notRequired(),
    sent_by: yup.string().nullable().notRequired(),
    sent_by_last_name: yup.string().nullable().notRequired(),
    sent_by_first_name: yup.string().nullable().notRequired(),
}).defined();

export const EmergencyAdvisorySchemaListPayloadSchema = yup.object({
    data : yup.array().of(EmergencyAdvisorySchema.clone())
});

export type IEmergencyAdvisory = yup.InferType<typeof EmergencyAdvisorySchema>;

export const EmergencyAdvisoryAddEditSchema = yup.object({
    emergency_advisory : EmergencyAdvisorySchema
})

//seasonal
export const IMonthsSchema = yup.object({
    id : yup.string().notRequired(),
    month: yup.string().notRequired(),
    value: yup.string().notRequired(),
})

export const SeasonalAdvisorySchema = yup.object({
    id : yup.string(),
    sms_output: yup.string().required(),
    forecast_date: yup.string().nullable().notRequired(),
    created_at: yup.string().nullable().notRequired(),
    updated_at: yup.string().nullable().notRequired(),
    sent_by: yup.string().nullable().notRequired(),
    sent_by_last_name: yup.string().nullable().notRequired(),
    sent_by_first_name: yup.string().nullable().notRequired(),
    forecast_data: yup.array().of(IMonthsSchema).nullable().notRequired(),
    enso_forecast: yup.string().nullable().notRequired(),
    seed_to_use: yup.string().nullable().notRequired(),
    advisory: yup.string().nullable().notRequired(),
}).defined();

export const SeasonalAdvisorySchemaListPayloadSchema = yup.object({
    data : yup.array().of(SeasonalAdvisorySchema.clone())
});

export type ISeasonalAdvisory = yup.InferType<typeof SeasonalAdvisorySchema>;

export const SeasonalAdvisoryAddEditSchema = yup.object({
    seasonal_advisory : SeasonalAdvisorySchema
})

//gale warning
export const GaleAdvisorySchema = yup.object({
    id : yup.string(),
    sms_output: yup.string().required(),
    forecast_date: yup.string().nullable().notRequired(),
    created_at: yup.string().nullable().notRequired(),
    updated_at: yup.string().nullable().notRequired(),
    sent_by: yup.string().nullable().notRequired(),
    sent_by_last_name: yup.string().nullable().notRequired(),
    sent_by_first_name: yup.string().nullable().notRequired(),
    advisory: yup.string().nullable().notRequired(),
    forecast_wind_speed: yup.string().nullable().notRequired(),
    description: yup.string().nullable().notRequired(),
    wave :yup.string().nullable().notRequired(),
}).defined();

export const GaleAdvisorySchemaListPayloadSchema = yup.object({
    data : yup.array().of(GaleAdvisorySchema.clone())
});

export type IGaleAdvisory = yup.InferType<typeof GaleAdvisorySchema>;

export const GaleAdvisoryAddEditSchema = yup.object({
    gale_warning_advisory : GaleAdvisorySchema
})

//tropical cyclone
export const TropicalCycloneAdvisorySchema = yup.object({
    id : yup.string(),
    sms_output: yup.string().required(),
    forecast_date: yup.string().nullable().notRequired(),
    created_at: yup.string().nullable().notRequired(),
    updated_at: yup.string().nullable().notRequired(),
    sent_by: yup.string().nullable().notRequired(),
    sent_by_last_name: yup.string().nullable().notRequired(),
    sent_by_first_name: yup.string().nullable().notRequired(),
    advisory: yup.string().nullable().notRequired(),
    name: yup.string().nullable().notRequired(),
    category: yup.string().nullable().notRequired(),
    km_per_hour: yup.string().nullable().notRequired(),
    path: yup.string().nullable().notRequired(),
}).defined();

export const TropicalCycloneAdvisorySchemaListPayloadSchema = yup.object({
    data : yup.array().of(GaleAdvisorySchema.clone())
});

export type ITropicalCycloneAdvisory = yup.InferType<typeof GaleAdvisorySchema>;

export const TropicalCycloneAddEditSchema = yup.object({
    tropical_cyclone_advisory : GaleAdvisorySchema
})

//Other weather
export const OtherWeatherAdvisorySchema = yup.object({
    id : yup.string(),
    sms_output: yup.string().required(),
    forecast_date: yup.string().nullable().notRequired(),
    created_at: yup.string().nullable().notRequired(),
    updated_at: yup.string().nullable().notRequired(),
    sent_by: yup.string().nullable().notRequired(),
    sent_by_last_name: yup.string().nullable().notRequired(),
    sent_by_first_name: yup.string().nullable().notRequired(),
    advisory: yup.string().nullable().notRequired(), 
}).defined();

export const OtherWeatherAdvisoryListPayloadSchema = yup.object({
    data : yup.array().of(GaleAdvisorySchema.clone())
});

export type IOtherWeatherAdvisory = yup.InferType<typeof GaleAdvisorySchema>;

export const OtherWeatherAddEditSchema = yup.object({
    other_weather_advisory : GaleAdvisorySchema
})