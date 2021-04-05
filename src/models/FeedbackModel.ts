import * as yup from 'yup';

export const FeedbackSchema = yup.object({
    id : yup.string(),
    created_at: yup.string().nullable().notRequired(),
    updated_at: yup.string().nullable().notRequired(),
    // province : yup.string().required(),
    // municipality : yup.string().required(),
    // type_of_feedback : yup.string().required(),
    feedback : yup.string().required(),
    date_received: yup.string().required(),
}).defined();

export const FeedbackListPayloadSchema = yup.object({
    data : yup.array().of(FeedbackSchema.clone())
});

export type IFeedback= yup.InferType<typeof FeedbackSchema>;

