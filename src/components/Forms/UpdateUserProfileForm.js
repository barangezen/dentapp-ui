import React from 'react';
import {
    fetchGroups,
    updateUser
} from '../../actions/index';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { connect } from 'react-redux';

class UpdateUserProfileForm extends React.Component
{
    componentDidMount() {
        this.props.fetchGroups();
    }

    renderGroups() {
        return this.props.groups.map((item, index) => {
            return <option key={item.id} value={item.id}>{item.name}</option>;
        });
    }

    onClickRegisterButton(formValues) {
        const values = {}; 

        Object.keys(formValues).forEach(key => {
            if (formValues[key].length != 0) {
                values[key] = formValues[key];
            }
        });

        this.props.updateUser(values);
    }

    getInitialValues = () => ({
        first_name: this.props.user.first_name,
        last_name: this.props.user.last_name,
        email: this.props.user.email,
        password: "",
        first_name: this.props.user.first_name,
        group_id: this.props.user.group_id,
        existing_password: ""
    });

    render()
    {
        return(
            <React.Fragment>
                <h5 className="m-0 pb-3 pt-3 font-weight-bold">
                    {this.props.title}
                </h5>
                <hr className="m-0 bg-dark" />
                {this.props.isLoggedIn === true ?
                    <Formik
                        enableReinitialize="true"
                        initialValues={ this.getInitialValues() }
                        validate={
                            values => {
                                const errors = {};

                                if (values.first_name) {
                                    if (values.first_name.length < 1) {
                                        errors.first_name = "First name cannot be less than 1 character.";
                                    } else if (values.first_name.length > 255) {
                                        errors.first_name = "First name cannot be longer than 255 characters.";
                                        // eslint-disable-next-line
                                    } else if (!/^[a-zA-Z\s\.\'\-ığüşöçİĞÜŞÖÇ]*$/.test(values.first_name)) {
                                        errors.first_name = "First name can only contain letters, dash, dot and apostrophe.";
                                    }
                                }

                                if (values.last_name) {
                                    if (values.last_name.length < 1) {
                                        errors.last_name = "Last name cannot be less than 1 character.";
                                    } else if (values.last_name.length > 255) {
                                        errors.last_name = "Last name cannot be longer than 255 characters.";
                                        // eslint-disable-next-line
                                    } else if (!/^[a-zA-Z\s\.\'\-ığüşöçİĞÜŞÖÇ]*$/.test(values.last_name)) {
                                        errors.last_name = "Last name can only contain letters, dash, dot and apostrophe.";
                                    }
                                }

                                if (values.email) {
                                    if (! /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                        errors.email = "Invalid e-mail address.";
                                    }
                                }

                                if (values.password) {
                                    if (values.password.length < 8) {
                                        errors.password = "Password cannot be less than 8 characters.";
                                    } else if (values.password.length > 20) {
                                        errors.password = "Password cannot be longer than 20 characters.";
                                    } else if (! /[A-ZİĞÜŞÖÇ]/.test(values.password)) {
                                        errors.password = "Password must contain at least 1 uppercase letter.";
                                    } else if (! /\d/.test(values.password)) {
                                        errors.password = "Password must contain at least 1 digit.";
                                    // eslint-disable-next-line
                                    } else if (! /^[\@\!\^\+\%\/\(\)\=\?\_\*\-\<\>\#\$\½\{\[\]\}\\\|\w]*$/.test(values.password)) {
                                        errors.password = "Password can only contain English letters and special characters.";
                                    }
                                }

                                if (! values.existing_password) {
                                    errors.existing_password = "Password is required.";
                                }

                                return errors;
                            }
                        }
                        onSubmit={(values, actions) => {
                            this.onClickRegisterButton(values);
                            actions.resetForm();
                        }}
                    >
                        {() => (
                            <Form>
                                <div className="form-row mt-3">
                                    <div className="col-6">
                                        <label className="font-weight-bold m-0" htmlFor="update_user_first_name">First Name:</label>
                                    </div>
                                    <div className="col-6">
                                        <label className="font-weight-bold m-0" htmlFor="update_user_last_name">Last Name:</label>                                        </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-6">
                                        <Field type="text" id="update_user_first_name" name="first_name" className="form-control" />
                                    </div>
                                    <div className="col-6">
                                        <Field type="text" id="update_user_last_name" name="last_name" className="form-control" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-6">
                                        <ErrorMessage name="first_name" component="div" className="text-danger small font-weight-bold" />
                                    </div>
                                    <div className="col-6">
                                        <ErrorMessage name="last_name" component="div" className="text-danger small font-weight-bold" />
                                    </div>
                                </div>
                                <div className="form-row mt-3">
                                    <div className="col-6">
                                        <label className="font-weight-bold m-0" htmlFor="update_user_email">E-mail:</label>
                                    </div>
                                    <div className="col-6">
                                        <label className="font-weight-bold m-0" htmlFor="update_user_password">New Password:</label>                                        </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-6">
                                        <Field type="email" id="update_user_email" name="email" className="form-control" />
                                    </div>
                                    <div className="col-6">
                                        <Field type="password" id="update_user_password" name="password" className="form-control" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-6">
                                        <ErrorMessage name="email" component="div" className="text-danger small font-weight-bold" />
                                    </div>
                                    <div className="col-6">
                                        <ErrorMessage name="password" component="div" className="text-danger small font-weight-bold" />
                                    </div>
                                </div>
                                <div className="form-row mt-2">
                                    <div className="col-6">
                                        <label htmlFor="update_user_existing_password" className="m-0 font-weight-bold">Your Password:</label>
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="update_user_group_id" className="m-0 font-weight-bold">Group:</label>
                                    </div>
                                </div>
                                <div className="form-row mt-2">
                                    <div className="col-6">
                                        <Field type="password" id="update_user_existing_password" name="existing_password" className="form-control" />
                                    </div>
                                    <div className="col-6">
                                        <Field name="group_id" as="select" id="update_user_group_id" className="form-control">
                                            {this.renderGroups()}
                                        </Field>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-6">
                                        <ErrorMessage name="existing_password" component="div" className="text-danger small font-weight-bold" />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-block bg-dark text-white mt-3">
                                    Update
                                </button>
                            </Form>
                        )}
                    </Formik>
                    :
                    <div className="mt-3 text-danger font-weight-bold border p-3 bg-light rounded">
                        Only authorized users can update their profile.
                    </div>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn,
    groups: state.group.groups
});

const mapDispatchToProps = {
    fetchGroups: fetchGroups,
    updateUser: updateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserProfileForm);