import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const Home = () => {
    const {role} = useContext(AuthContext);
    const navigate = useNavigate();
    if(role > 0)
    {
        switch(role)
        {
            case 1:
                navigate('/admin/home')
                break;
            case 2:
                navigate('/home')
                break;
            case 3:
                navigate('/doctor/home')
                break;
        }
    }
    return (
        <>
            <span>Please <NavLink to='/register'>register</NavLink> or <NavLink to='/login'>login</NavLink></span>
        </>
    );
}

export default Home;
