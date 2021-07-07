import React from 'react';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';

class App extends React.Component
{
    render()
    {
        if (this.props.auth.isLoggedIn) {
            return <div>Logged in.</div>;
        } else {
            return (
                <React.Fragment>
                    <LoginForm />
                </React.Fragment>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps)(App);