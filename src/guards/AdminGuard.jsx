import React, { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { NavLink } from 'react-router-dom';

const AdminGuard = ({children}) => {
    const {role} = useContext(AuthContext)
    if(role!==1)
    {
        return (
            <>
                <span>You shouldn't be here please <NavLink path='/register'>register</NavLink> or 
                    <NavLink path='/login'>login</NavLink></span>
            </>
        )
    }
    return (
        <>
            {children}
        </>
    );
}

export default AdminGuard;
