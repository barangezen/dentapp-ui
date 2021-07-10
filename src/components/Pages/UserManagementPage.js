import React from 'react';
import { connect } from 'react-redux';
import ReusableForm from '../Forms/ReusableForm';
import {
    fetchGroups,
    addUser,
    updateUser
} from '../../actions/index';
import * as createUserForm from '../Forms/ConcreteForms/createUser';
import * as updateUserForm from '../Forms/ConcreteForms/updateUser';
class UserManagementPage extends React.Component
{  
    componentDidMount() {
        this.props.fetchGroups();
    }

    onSubmitCreateUser = (formValues = {}, formActions) => {
        this.props.addUser(formValues);
        formActions.resetForm();
    };

    onSubmitUpdateUser = (formValues = {}, formActions) => {
        const sanitizedFormValues = {};
        Object.keys(formValues).forEach(key => {
            if (formValues[key].length > 0) {
                sanitizedFormValues[key] = formValues[key];
            }
        });
        this.props.updateUser(sanitizedFormValues);
        formActions.resetForm();
    };

    render()
    {
        return(
            <div className="pl-4 pr-4">
                <h5 className="m-0 pb-3 pt-3 font-weight-bold">User Management</h5>
                <hr className="m-0 bg-dark"/>
                <div className="row">
                    <div className="col-6">
                        <ReusableForm 
                            title={createUserForm.title}
                            initialValues={createUserForm.initialValues}
                            validationSchema={createUserForm.validationSchema()}
                            fields={createUserForm.fields(this.props.groups)}
                            onSubmit={this.onSubmitCreateUser}
                            actions={createUserForm.actions()}
                        />
                    </div>
                    <div className="col-6">
                        <ReusableForm
                            title={updateUserForm.title}
                            initialValues={updateUserForm.initialValues(this.props.user)}
                            validationSchema={updateUserForm.validationSchema()}
                            fields={updateUserForm.fields}
                            onSubmit={this.onSubmitUpdateUser}
                            actions={updateUserForm.actions()}
                        />
                    </div>
                    
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    groups: state.group.groups
});

const mapDispatchToProps = {
    fetchGroups: fetchGroups,
    addUser: addUser,
    updateUser: updateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManagementPage);