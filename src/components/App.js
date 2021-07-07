import React from 'react';
import { connect } from 'react-redux';
import LoginPage from './LoginPage';
import '../styles/notification.css'
import LandingPage from './LandingPage';
import LoadingSpinner from './LoadingSpinner';
import { getAuthStateFromSession } from '../actions/index';
import '../styles/app.css';
class App extends React.Component
{
    componentDidMount()
    {
        if (this.props.auth.isLoggedIn === null) {
            this.props.getAuthStateFromSession();
        }
    }

    renderLandingPage()
    {
        if (this.props.auth.isLoggedIn === null) {
            return <LoadingSpinner />;
        } else if (this.props.auth.isLoggedIn === false) {
            return <LoginPage />;
        } else {
            return <LandingPage />;
        }
    }

    render()
    {
        return this.renderLandingPage();
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = {
    getAuthStateFromSession: getAuthStateFromSession
};

export default connect(mapStateToProps, mapDispatchToProps)(App);