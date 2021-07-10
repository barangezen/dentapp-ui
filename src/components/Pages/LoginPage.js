import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/index';
import ReusableForm from '../Forms/ReusableForm';
import * as loginForm from '../Forms/ConcreteForms/loginForm';

class LoginPage extends React.Component
{
    onClickLogin = ({email, password}) => {
        this.props.login(email, password);
    };

    render()
    {
        return(
            <div className="row m-0 bg-secondary justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="border rounded col-8 col-lg-4 m-0 p-3 border bg-light">
                    <ReusableForm 
                        title={loginForm.title}
                        initialValues={loginForm.initialValues}
                        validationSchema={loginForm.validationSchema()}
                        fields={loginForm.fields}
                        actions={loginForm.actions()}
                        onSubmit={this.onClickLogin}
                    />
                </div>
            </div>
        );
    }
}

export default connect(null, { login })(LoginPage);