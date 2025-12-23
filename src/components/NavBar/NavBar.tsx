import React from 'react';
import { NavBarStructure } from '../../utilities/utility';
import { NavLink } from 'react-router-dom';
import { FiSearch, FiShoppingBag } from 'react-icons/fi';
import "./NavBar.css";

export const NavBar = ({shoppingCartValue}:{shoppingCartValue:number}) => {
    return ( 
        <nav className='nav_container'>
            <ul className='nav'>
                {NavBarStructure.map((el, index) => {
                    return (
                        <li key={index}>
                            <NavLink to={el.to}>{el.link}</NavLink>
                            </li>                                
                    )
                })}
            </ul>
            <div className='nav_icons'>
                <FiSearch className='nav_icon' />
                
                <div className='cart_icon_wrapper'>
                    <FiShoppingBag className='nav_icon' />
                    {shoppingCartValue > 0 && (
                        <span className='cart_badge'>{shoppingCartValue}</span>
                    )}
                </div>
            </div>
        </nav>
     );
}
 
