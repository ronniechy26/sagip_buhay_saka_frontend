import * as yup from 'yup';

const userInitialShape = {
    id: yup.string(),
    created_at: yup
        .string()
        .nullable()
        .notRequired(),
    updated_at: yup
        .string()
        .nullable()
        .notRequired(),
    username: yup
        .string()
        .email()
        .required(),
    first_name: yup.string().required(),
    middle_name: yup.string().nullable(),
    last_name: yup.string().required(),
    role : yup.string().required(),
    credit_count : yup.string().nullable(),
    recipient_total : yup.string().nullable(),
    last_login_date: yup
        .string()
        .nullable()
        .notRequired(),
    is_active: yup.bool(),
    last_date_modified: yup
        .string()
        .nullable()
        .notRequired(),
};

export const UserSchema = yup.object(userInitialShape).defined();

const userLoginInitialShape = {
    token: yup.string(),
    user: UserSchema,
    token_expiry: yup.number().nullable(),
    employee_id: yup.number().notRequired(),
};

export const UserLoginSchema = yup.object(userLoginInitialShape);

export const UsersListPayloadSchema = yup.object({
    data : yup.array().of(UserSchema.clone())
});

export const UserAddEditSchema = yup.object({
    user : UserSchema
})

export type IUser = yup.InferType<typeof UserSchema>;
// export type IUser = typeof UserSchema;