import * as Yup from 'yup';

export const title = "Update Your Profile";

export const initialValues = (user) => ({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    password: "",
    existing_password: ""
});

export const validationSchema = () => Yup.object({
    first_name: Yup.string()
        .min(1, 'First name cannot be less than 1 character.')
        .max(255, 'First name cannot be longer than 255 characters.')
        .matches(
            // eslint-disable-next-line
            /^[a-zA-Z\s\.\'\-ığüşöçİĞÜŞÖÇ]*$/,
            'First name can only contain letters, dash, dot and apostrophe.'
        ),
    last_name: Yup.string()
        .min(1, 'Last name cannot be less than 1 character.')
        .max(255, 'Last name cannot be longer than 255 characters.')
        .matches(
            // eslint-disable-next-line
            /^[a-zA-Z\s\.\'\-ığüşöçİĞÜŞÖÇ]*$/,
            'Last name can only contain letters, dash, dot and apostrophe.'
        ),
    email: Yup.string()
        .email('Invalid email address.'),
    password: Yup.string()
        .min(8, 'Password cannot be less than 8 characters.')
        .max(20, 'Password cannot be longer than 20 characters.')
        .matches(
            /[A-ZİĞÜŞÖÇ]/,
            'Password must containt at least 1 uppercase character.'
        )
        .matches(
            /\d/,
            'Password must contain at least 1 digit.'
        )
        .matches(
            // eslint-disable-next-line
            /^[\@\!\^\+\%\/\(\)\=\?\_\*\-\<\>\#\$\½\{\[\]\}\\\|\w]*$/,
            'Password can only contain English letters and special characters.'
        ),
    existing_password: Yup.string()
        .required('Password is required.')
});

export const fields = (groups) => ([
    {
        field: "input",
        name: "first_name",
        type: "text",
        label: "First Name"
    },
    {
        field: "input",
        name: "last_name",
        type: "text",
        label: "Last Name"
    },
    {
        field: "input",
        name: "email",
        type: "email",
        label: "Email"
    },
    {
        field: "input",
        name: "password",
        type: "password",
        label: "New Password to Change"
    },
    {
        field: "input",
        name: "existing_password",
        type: "password",
        label: "Existing Password"

    }
]);

export const actions = (onSubmit) => (
    <div className="mt-3 d-flex justify-content-start align-items-center">
        <button
            type="submit"
            className="btn btn-outline-success"
        >
            Update
        </button>
    </div>
);