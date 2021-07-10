import React from 'react';
import { connect } from 'react-redux';
import LoginPage from './Pages/LoginPage';
import '../styles/notification.css'
import LandingPage from './Pages/LandingPage';
import LoadingSpinner from './LoadingSpinner';
import { getAuthStateFromSession, syncStateWithLocalStorage } from '../actions/index';
import '../styles/app.css';
class App extends React.Component
{
    componentDidMount()
    {
        if (this.props.auth.isLoggedIn === null) {
            this.props.getAuthStateFromSession();
        }

        window.addEventListener('storage', () => {
            this.props.syncStateWithLocalStorage();
        });
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
    getAuthStateFromSession: getAuthStateFromSession,
    syncStateWithLocalStorage: syncStateWithLocalStorage
};

export default connect(mapStateToProps, mapDispatchToProps)(App);