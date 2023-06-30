import * as yup from 'yup';

export const FeedbackSchema = yup.object({
    id : yup.string(),
    created_at: yup.string().nullable().notRequired(),
    updated_at: yup.string().nullable().notRequired(),
    province : yup.string().nullable().notRequired(),
    region : yup.string().nullable().notRequired(),
    // type_of_feedback : yup.string().required(),
    feedback : yup.string().nullable().notRequired(),
    date_received: yup.string().required(),
    recipient_number : yup.string().required(),
    recipient_name : yup.string().nullable().notRequired(),
}).defined();

export const FeedbackListPayloadSchema = yup.object({
    data : yup.array().of(FeedbackSchema.clone())
});

export type IFeedback= yup.InferType<typeof FeedbackSchema>;

