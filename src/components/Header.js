import React from 'react';
import '../styles/header.css';
import { Link } from 'react-router-dom';
import { logout } from '../actions/index';
import { connect } from 'react-redux';

class Header extends React.Component
{
    render()
    {
        return(
            <div id="header" className="text-light pr-2 pl-2 d-flex flex-column justify-content-between align-items-start h-100">
                <div>
                    <h5 className="m-0 p-3 font-weight-bold">Dentapp</h5>
                    <hr className="bg-light m-0" />
                    <ul className="list-unstyled">
                        <Link to="/">
                            <li className="p-2 pl-3 pr-3">
                                <i className="fas fa-users"></i>
                                <span className="ml-3">User Management</span>
                            </li>
                        </Link>
                        <Link to="/appointments">
                            <li className="p-2 pl-3 pr-3">
                                <i className="far fa-calendar-alt"></i>
                                <span className="ml-3">Appointments</span>
                            </li>
                        </Link>
                        <Link to="examinations">
                            <li className="p-2 pl-3 pr-3">
                                <i className="fas fa-tooth"></i>
                                <span className="ml-3">Examinations</span>
                            </li>
                        </Link>
                        <Link to="treatment-management">
                            <li className="p-2 pl-3 pr-3">
                                <i className="fas fa-pen-square"></i>
                                <span className="ml-3">Treatment Management</span>
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="w-100 text-center p-3">
                    <a href="#" className=""
                        onClick={
                            () => {
                                this.props.logout();
                            }
                        }
                    >
                        <span className="p-2">
                            Logout
                        </span>
                    </a>
                </div>
            </div>
        );
    }
}

export default connect(null, { logout })(Header);