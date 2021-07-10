import * as Yup from 'yup';

export const title = "Add New User";

export const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    group_id: 1
};

export const validationSchema = () => Yup.object({
    first_name: Yup.string()
        .min(1, 'First name cannot be less than 1 character.')
        .max(255, 'First name cannot be longer than 255 characters.')
        .matches(
            // eslint-disable-next-line
            /^[a-zA-Z\s\.\'\-ığüşöçİĞÜŞÖÇ]*$/,
            'First name can only contain letters, dash, dot and apostrophe.'
        )
        .required('First name is required.'),
    last_name: Yup.string()
        .min(1, 'Last name cannot be less than 1 character.')
        .max(255, 'Last name cannot be longer than 255 characters.')
        .matches(
            // eslint-disable-next-line
            /^[a-zA-Z\s\.\'\-ığüşöçİĞÜŞÖÇ]*$/,
            'Last name can only contain letters, dash, dot and apostrophe.'
        )
        .required('Last name is required.'),
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
        )
        .required('Password is required'),
    email: Yup.string()
        .email('Invalid email address.')
        .required('E-mail address is required.')
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
        label: "Password"
    },
    {
        field: "select",
        name: "group_id",
        label: "Group",
        options: groups.map(group => ({
            label: group.name,
            value: group.id
        }))
    }
]);

export const actions = (onSubmit) => (
    <div className="mt-3 d-flex justify-content-start align-items-center">
        <button
            type="submit"
            className="btn btn-outline-success"
        >
            Create User
        </button>
    </div>
);