import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
    return (
        <>
                <span>Please <NavLink to='/register'>register</NavLink> or <NavLink to='/login'>login</NavLink></span>
        </>
    );
}

export default Home;
