import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

class ReusableForm extends React.Component
{
    renderFields = (fields = []) => {
        return fields.map((field, index) => {
            return <div key={index}>{this.renderField(field)}</div>;
        });
    };

    renderOptions = (options = []) => {
        return options.map(({label, value}, index) => {
            return (
                <option key={index} value={value}>
                    {label}
                </option>
            );
        });
    };

    renderField = (field = {}) => {
        switch (field.field) {
            case "input":
                return (
                    <React.Fragment>
                        <div className="form-row mt-3 mb-2">
                            <div className="col-12">
                                <label 
                                    className="font-weight-bold m-0"
                                    htmlFor={field.name}
                                >
                                    {field.label}
                                </label>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-12">
                                <Field
                                    className="form-control"
                                    name={field.name}
                                    type={field.type}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-12">
                                <ErrorMessage
                                    name={field.name}
                                    component="div"
                                    className="text-danger small font-weight-bold"
                                />
                            </div>
                        </div>
                    </React.Fragment>
                );
            case "select":
                return(
                    <React.Fragment>
                        <div className="form-row mt-3 mb-2">
                            <div className="col-12">
                                <label htmlFor={field.name} className="font-weight-bold m-0">
                                    {field.label}
                                </label>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-12">
                                <Field name={field.name} as="select" className="form-control">
                                    {this.renderOptions(field.options)}
                                </Field>
                            </div>
                        </div>
                    </React.Fragment>
                );        
            default:
                break;
        }
    };

    render()
    {
        return(
            <React.Fragment>
                <h5 className="m-0 pb-3 pt-3 font-weight-bold">
                    { this.props.title }
                </h5>
                <hr className="m-0 bg-dark" />
                <Formik
                    initialValues={ this.props.initialValues }
                    enableReinitialize="true"
                    validationSchema={this.props.validationSchema}
                    onSubmit={ this.props.onSubmit }
                >
                    <Form>
                        {this.renderFields(this.props.fields)}
                        {this.props.actions}
                    </Form>
                </Formik>
            </React.Fragment>
        );
    }
}

export default ReusableForm;