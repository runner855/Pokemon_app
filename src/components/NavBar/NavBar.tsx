import React from 'react';
import "./NavBar.css";
import { NavBarStructure } from '../../utilities/utility';
import { NavLink } from 'react-router-dom';

export const NavBar = ({shoppingCartValue}:{shoppingCartValue:number}) => {
    return ( 
        <nav className='main_container'>
            <ul className='nav'>
                {NavBarStructure.map((el, index) => {
                    return (
                        <li key={index}>
                            <NavLink to={el.to}>{el.link}</NavLink>
                        </li>
                    )
                })}
            </ul>
            <p className='value'>{`shoppingCartValue: ${shoppingCartValue}`}</p>
        </nav>
     );
}
 
