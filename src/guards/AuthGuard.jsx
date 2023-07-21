import React, { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { NavLink } from 'react-router-dom';

const AuthGuard = ({children}) => {
    const {isAuth} = useContext(AuthContext)
    if(!isAuth)
    {
        return (
            <>
                <span>Please <NavLink to='/register'>register</NavLink> or <NavLink to='/login'>login</NavLink></span>
            </>
        )
    }
    return (
        <>
            {children}
        </>
    );
}

export default AuthGuard;
