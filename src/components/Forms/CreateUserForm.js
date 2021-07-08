import React from 'react';
import {
    fetchGroups,
    addUser
} from '../../actions/index';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { connect } from 'react-redux';



class CreateUserForm extends React.Component
{
    componentDidMount() {
        this.props.fetchGroups();
    }

    renderGroups() {
        return this.props.groups.map((item, index) => {
            return <option key={item.id} value={item.id}>{item.name}</option>;
        });
    }

    onClickRegisterButton(values) {
        this.props.addUser(values);
    }

    render()
    {
        return(
            <React.Fragment>
                <h5 className="m-0 pb-3 pt-3 font-weight-bold">
                    { this.props.title }
                </h5>
                <hr className="m-0 bg-dark" />
                { this.props.roles['ADMIN'] ?
                    <Formik
                        enableReinitialize="true"
                        initialValues={{
                            first_name: "",
                            last_name: "",
                            email: "",
                            password: "",
                            group_id: "1",
                        }}
                        validate={
                            values => {
                                const errors = {};

                                if (!values.first_name) {
                                    errors.first_name = "First name is required.";
                                } else if (values.first_name.length < 1) {
                                    errors.first_name = "First name cannot be less than 1 character.";
                                } else if (values.first_name.length > 255) {
                                    errors.first_name = "First name cannot be longer than 255 characters.";
                                    // eslint-disable-next-line
                                } else if (!/^[a-zA-Z\s\.\'\-ığüşöçİĞÜŞÖÇ]*$/.test(values.first_name)) {
                                    errors.first_name = "First name can only contain letters, dash, dot and apostrophe.";
                                }

                                if (!values.last_name) {
                                    errors.last_name = "Last name is required.";
                                } else if (values.last_name.length < 1) {
                                    errors.last_name = "Last name cannot be less than 1 character.";
                                } else if (values.last_name.length > 255) {
                                    errors.last_name = "Last name cannot be longer than 255 characters.";
                                    // eslint-disable-next-line
                                } else if (!/^[a-zA-Z\s\.\'\-ığüşöçİĞÜŞÖÇ]*$/.test(values.last_name)) {
                                    errors.last_name = "Last name can only contain letters, dash, dot and apostrophe.";
                                }

                                if (!values.email) {
                                    errors.email = "E-mail is required.";
                                } else if (! /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                    errors.email = "Invalid e-mail address.";
                                }

                                if (!values.password) {
                                    errors.password = "Password is required.";
                                } else if (values.password.length < 8) {
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
                                        <label className="font-weight-bold m-0" htmlFor="addUser_first_name">First Name:</label>
                                    </div>
                                    <div className="col-6">
                                        <label className="font-weight-bold m-0" htmlFor="addUser_last_name">Last Name:</label>                                        </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-6">
                                        <Field type="text" id="addUser_first_name" name="first_name" className="form-control" />
                                    </div>
                                    <div className="col-6">
                                        <Field type="text" id="addUser_last_name" name="last_name" className="form-control" />
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
                                        <label className="font-weight-bold m-0" htmlFor="addUser_email">E-mail:</label>
                                    </div>
                                    <div className="col-6">
                                        <label className="font-weight-bold m-0" htmlFor="addUser_password">Password:</label>                                        </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-6">
                                        <Field type="email" id="addUser_email" name="email" className="form-control" />
                                    </div>
                                    <div className="col-6">
                                        <Field type="password" id="addUser_password" name="password" className="form-control" />
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
                                    <div className="col-12">
                                        <label htmlFor="addUser_group_id" className="m-0 font-weight-bold">Group:</label>
                                    </div>
                                </div>
                                <div className="form-row mt-2">
                                    <div className="col-12">
                                        <Field name="group_id" as="select" id="addUser_group_id" className="form-control">
                                            {this.renderGroups()}
                                        </Field>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-block bg-dark text-white mt-3">
                                    Create
                                </button>
                            </Form>
                        )}
                    </Formik>
                    :
                    <div className="mt-3 text-danger font-weight-bold border p-3 bg-light rounded">
                        Only admins can add new users to the system.
                    </div>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        roles: state.auth.user.roles,
        groups: state.group.groups
    };
}

const mapDispatchToProps = {
    fetchGroups: fetchGroups,
    addUser: addUser
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserForm);