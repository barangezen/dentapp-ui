import React from 'react';
import { createRef } from 'react';
import { connect } from 'react-redux';
import {
    fetchGroups,
    addUser
} from '../../actions/index'

class UserProfile extends React.Component
{
    constructor(props)
    {
        super(props);
        this.registerFirstNameRef = createRef();
        this.registerLastNameRef = createRef();
        this.registerEmailRef = createRef();
        this.registerPasswordRef = createRef();
        this.registerGroupId = createRef();
    }

    componentDidMount()
    {
        this.props.fetchGroups();
    }

    renderGroups()
    {
        return this.props.groups.map((item, index) => {
            return <option key={ item.id } value={ item.id }>{ item.name }</option>;
        });
    }

    onClickRegisterButton(e)
    {
        e.preventDefault();
        const formValues = {
            group_id: this.registerGroupId.current.value,
            first_name: this.registerFirstNameRef.current.value,
            last_name: this.registerLastNameRef.current.value,
            email: this.registerEmailRef.current.value,
            password: this.registerPasswordRef.current.value
        };

        this.props.addUser(formValues);
    }

    render()
    {
        return(
            <div className="pl-4 pr-4">
                <h5 className="m-0 pb-3 pt-3 font-weight-bold">User Management</h5>
                <hr className="m-0 bg-dark"/>
                <div className="row">
                    <div className="col-6">
                        <h5 className="m-0 pb-3 pt-3 font-weight-bold">
                            Add New User
                        </h5>
                        <hr className="m-0 bg-dark"/>
                        <form action="" className="mt-3">
                            <div className="form-row mt-2">
                                <div className="col-6">
                                    <label className="m-0 font-weight-bold" htmlFor="">First Name:</label>
                                </div>
                                <div className="col-6">
                                    <label className="m-0 font-weight-bold" htmlFor="">Last Name:</label>
                                </div>
                            </div>
                            <div className="form-row mt-2">
                                <div className="col-6">
                                    <input ref={this.registerFirstNameRef} type="text" className="form-control form-control-sm" />
                                </div>
                                <div className="col-6">
                                    <input ref={this.registerLastNameRef} type="text" className="form-control form-control-sm" />
                                </div>
                            </div>
                            <div className="form-row mt-2">
                                <div className="col-6">
                                    <label className="m-0 font-weight-bold" htmlFor="">E-mail:</label>
                                </div>
                                <div className="col-6">
                                    <label className="m-0 font-weight-bold" htmlFor="">Password:</label>
                                </div>
                            </div>
                            <div className="form-row mt-2">
                                <div className="col-6">
                                    <input ref={this.registerEmailRef} type="text" className="form-control form-control-sm" />
                                </div>
                                <div className="col-6">
                                    <input ref={this.registerPasswordRef} type="text" className="form-control form-control-sm" />
                                </div>
                            </div>        
                            <div className="form-row mt-2">
                                <div className="col-12">
                                    <label htmlFor="" className="m-0 font-weight-bold">Group:</label>
                                </div>                                
                            </div>  
                            <div className="form-row mt-2">
                                <div className="col-12">
                                    <select ref={this.registerGroupId} name="" id="" className="form-control form-control-sm">
                                        { this.renderGroups() }
                                    </select>
                                </div>
                            </div>
                            <button 
                                className="btn btn-dark btn-block mt-3"
                                onClick = { (e) => { this.onClickRegisterButton(e) } }
                            >
                                Register
                            </button>              
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        groups: state.group.groups
    };
}

const mapDispatchToProps = {
    fetchGroups: fetchGroups,
    addUser: addUser
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);