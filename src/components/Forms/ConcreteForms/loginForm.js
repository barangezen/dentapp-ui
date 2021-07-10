import * as Yup from 'yup';

export const title = "Login";

export const initialValues = {
    email: "",
    password: ""
};

export const validationSchema = () => Yup.object({
    password: Yup.string()
        .required('Password is required'),
    email: Yup.string()
        .email('Invalid email address.')
        .required('E-mail address is required.')
});

export const fields = [
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
    }
];

export const actions = () => (
    <div className="mt-3 d-flex justify-content-start align-items-center">
        <button
            type="submit"
            className="btn btn-dark btn-block text-white"
        >
            Login
        </button>
    </div>
);