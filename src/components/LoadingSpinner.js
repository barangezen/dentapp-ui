import React from 'react';

export default () => {
    return(
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
            <span className="mb-4">Loading</span>
            <div className="spinner-border" role="status" />
        </div>
    );
};