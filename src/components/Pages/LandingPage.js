import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Header from '../Header';
import history from '../../history';
import UserManagementPage from './UserManagementPage';
class LandingPage extends React.Component
{
    render()
    {
        return(
            <Router history={ history }>
                <div className="row m-0 flex-nowrap">
                    <div className="flex-shrink-0 p-2 bg-dark" style={{ height: '100vh' }}>
                        <Header />
                    </div>
                    <div className="flex-grow-1">
                        <Switch>
                            <Route path="/" exact component={ UserManagementPage } />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default LandingPage;