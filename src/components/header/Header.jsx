
import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import './header.css'
import AuthContext from '../../contexts/AuthContext';
const Header = () => {
    const {isAuth,user, logout} = useContext(AuthContext);
    const navigate = useNavigate()
    let name = 'user'
    if(isAuth)
    {
        name = user.name
    }
    const logoutHandler = () =>{
        logout();
        navigate("/");
    }
    const itemsNotAuth = [
        {
            label: name,
            key: 'SubMenu',
            icon: <UserOutlined />,
            children: [
                {
                    label: (
                        <NavLink to='/register'>Registration</NavLink>
                    ),
                    key: 'login'
                },
                {
                    label: (
                        <NavLink to='/login'>LogIn</NavLink>
                    ),
                    key: 'signup'
                }
            ]
        },
        
    ]
    const itemsAuth = [
        {
            label: name,
            key: 'SubMenu',
            icon: <UserOutlined />,
            children: [
                {
                    label: (
                        <NavLink to='/edit'>Edit</NavLink>
                    ),
                    key: 'login'
                },
                {
                    label: (
                        <NavLink to='/change-password'>ChangePassword</NavLink>
                    ),
                    key: 'signup'
                },
                {
                    label: (
                        <div onClick={()=>logoutHandler()}>LogOut</div>
                    ),
                    key: 'logout'
                },
            ]
        },
        
    ]
    const [current, setCurrent] = useState('SubMenu');
    const onClick = (e) => {
        setCurrent(e.key);
      };
    return (
        <header className='header'>
                <Menu onClick={onClick} selectedKeys={[current]} mode="vertical" items={isAuth?itemsAuth:itemsNotAuth} 
                    style={{float: 'right'}}/>
        </header>
    );
}

export default Header;
