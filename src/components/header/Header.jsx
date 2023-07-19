
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import './header.css'
const Header = () => {
    const items = [
        {
            label: 'user',
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
                },
                {
                    label: (
                        <NavLink>LogOut</NavLink>
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
                <Menu onClick={onClick} selectedKeys={[current]} mode="vertical" items={items} style={{float: 'right'}}/>
        </header>
    );
}

export default Header;
