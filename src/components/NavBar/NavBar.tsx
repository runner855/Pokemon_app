import React from 'react';
import { NavBarStructure } from '../../utilities/utility';
import { NavLink } from 'react-router-dom';
import { FiSearch, FiShoppingBag } from 'react-icons/fi';
import { useNavigate } from "react-router";
import { useAppContext } from '../../context/AppContext';
import { BOTTOM_NAVBAR_RED_LABEL } from '../../constants/dictionary';
import "./NavBar.css";

export const NavBar = () => {
    const { cart } = useAppContext();
    const navigate = useNavigate();

    return (
        <header className='header'>
            <nav className='nav_container'>
                <ul className='nav'>
                    {NavBarStructure.map((el, index) => (
                        <li key={index}>
                            <NavLink to={el.to}>{el.link}</NavLink>
                        </li>
                    ))}
                </ul>

                <div className='nav_icons'>
                    <FiSearch className='nav_icon' onClick={() => navigate("/search")} />

                    <div className='cart_icon_wrapper'>
                        <FiShoppingBag className='nav_icon' onClick={() => navigate("/basket")} />
                        {cart.length > 0 && (
                            <span className='cart_badge'>
                                {cart.reduce((total, item) => total + (item.quantity ?? 0), 0)}
                            </span>
                        )}
                    </div>
                </div>
            </nav>

            <nav className='nav2'>
                {BOTTOM_NAVBAR_RED_LABEL}
            </nav>
        </header>
    );
};
