import React from 'react';
import CreateUserForm from '../Forms/CreateUserForm';
import UpdateUserProfileForm from '../Forms/UpdateUserProfileForm';
class UserProfile extends React.Component
{  

    render()
    {
        return(
            <div className="pl-4 pr-4">
                <h5 className="m-0 pb-3 pt-3 font-weight-bold">User Management</h5>
                <hr className="m-0 bg-dark"/>
                <div className="row">
                    <div className="col-6">
                        <CreateUserForm title="Add New User"/>
                    </div>
                    <div className="col-6">
                        <UpdateUserProfileForm title="Update Your Profile"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserProfile;