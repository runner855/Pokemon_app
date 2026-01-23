import React from 'react';
import { NavBarStructure } from '../../utilities/utility';
import { NavLink } from 'react-router-dom';
import { FiSearch, FiShoppingBag } from 'react-icons/fi';
import { CartItem, FavoriteItem } from '../../type/appTypes';
import { useNavigate } from "react-router";
import "./NavBar.css";
import { BOTTOM_NAVBAR_RED_LABEL } from '../../constants/dictionary';

interface NavBarProps {
    cart: CartItem[];
    shoppingCartValue: number;
     favorites: FavoriteItem[];
    setFavorites: React.Dispatch<React.SetStateAction<FavoriteItem[]>>;

}

export const NavBar = ({ shoppingCartValue, cart, favorites, setFavorites }: NavBarProps) => {

    const navigate = useNavigate();

    const handleAddToCartClick = () => {
        navigate(`/basket`);
    }

    const handleNavigateToSearch = () => {
        navigate(`/search`);
    }


    return (
        <header className='header'>
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
                    <FiSearch className='nav_icon' onClick={handleNavigateToSearch} />

                    <div className='cart_icon_wrapper'>
                        <FiShoppingBag className='nav_icon' onClick={handleAddToCartClick} />
                        {cart.length > 0 && (
                            <span className='cart_badge'>{cart.reduce((total, item) => total + (item.quantity ? item.quantity : 0), 0)}</span>
                        )}
                    </div>
                </div>
            </nav>
            <nav className='nav2'>
                {BOTTOM_NAVBAR_RED_LABEL}
            </nav>
        </header>
    );
}

