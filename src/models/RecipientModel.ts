import * as yup from 'yup';

export const RecipientSchema = yup.object({
    id : yup.string(),
    created_at: yup.string().nullable().notRequired(),
    updated_at: yup.string().nullable().notRequired(),
    first_name : yup.string().required(),
    middle_name: yup.string().nullable(),
    last_name: yup.string().required(),
    contact_number : yup.string().max(10),
    region : yup.string().required(),
    province :  yup.string().required(),
    lgu : yup.string().nullable(),
    is_active : yup.boolean(),
    is_subscribe : yup.boolean(),
    access_token : yup.string().nullable(),
    created_by : yup.string()
}).defined();

export const RecipientListPayloadSchema = yup.object({
    data : yup.array().of(RecipientSchema.clone())
});

export type IRecipient = yup.InferType<typeof RecipientSchema>;

export const RecipientAddEditSchema = yup.object({
    recipient : RecipientSchema
})