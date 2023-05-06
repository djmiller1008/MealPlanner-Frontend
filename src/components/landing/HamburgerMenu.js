import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { logout, demoLogin } from '../util/ApiUtil';
import { slide as Menu } from 'react-burger-menu';

export default function HamburgerMenu({ user }) {
    const history = useHistory();


    const logoutUser = async (e) => {
        e.preventDefault();
        const response = await logout();
        if (response.status === 200) {
          user.setJwt("");
          history.replace("/home");
        }
      }

    const handleDemoLogin = e => {
        e.preventDefault();
        demoLogin().then(response => {
          user.setJwt(response.data);
          history.replace("/")
        })
      }

    const renderLogin = () => {
        if (!user.jwt) {
            return (
                <>
                    <NavLink className="menu-item bm-item" to={'/login'}>LOGIN</NavLink>
                    <button onClick={handleDemoLogin} className='menu-item bm-item menu-item-demo'>DEMO</button>
                </>
            );
        }
        return <NavLink className="menu-item" to={'/'}>DASHBOARD</NavLink>;
    }

    const renderLogout = () => {
        if (user.jwt) {
            return <button onClick={logoutUser} className='menu-item menu-logout'>LOGOUT</button>;
        }
    }

    return (
        <Menu>
            <i className="fa fa-cutlery logo sidebar-logo" aria-hidden="true"></i>
            <NavLink className="menu-item" to={'/search'}>RECIPES</NavLink>
            {renderLogin()}
            {renderLogout()}
        </Menu>
    )
}
