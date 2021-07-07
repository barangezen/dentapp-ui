import React from 'react';
import { createRef } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/index'

class LoginPage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.emailRef = createRef();
        this.passwordRef = createRef();
    }

    onClickLoginButton = e => {
        this.props.login(
            this.emailRef.current.value,
            this.passwordRef.current.value
        );
    };

    render()
    {
        return(
            <div className="row m-0 bg-secondary justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="border rounded col-8 col-lg-4 m-0 p-3 border small bg-light">
                    <div className="row">
                        <div className="col-12">
                            <h5>Login Form</h5>
                            <hr className="mt-0" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label className="m-0 mb-1 font-weight-bold" htmlFor="email">E-mail:</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <input ref={ this.emailRef } id="email" type="text" className="form-control form-control-sm" />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12">
                            <label className="m-0 mb-1 font-weight-bold" htmlFor="password">Password: </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <input ref={ this.passwordRef } id="password" type="text" className="form-control form-control-sm" />
                        </div>
                    </div>
                    <button
                        onClick={ e => { this.onClickLoginButton(e); } }
                        className="mt-3 btn btn-sm btn-dark btn-block"
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }
}

export default connect(null, { login })(LoginPage);