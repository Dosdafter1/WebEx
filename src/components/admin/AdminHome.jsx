import React from 'react';
import ResList from './ResList';
import { NavLink } from 'react-router-dom';

const AdminHome = () => {
    return (
        <div>
            <ResList />
            <NavLink to='/admin/doc-register'>add Doctor</NavLink>
        </div>
    );
}

export default AdminHome;
