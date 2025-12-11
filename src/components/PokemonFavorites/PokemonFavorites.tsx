import React from 'react';
import { FavoriteItem } from '../../type/appTypes';
import { FavoritesCard } from '../FavoritesCard/FavoritesCard';
import "./PokemonFavorites.css"

export const PokemonFavorites = ({ favorites }: { favorites: FavoriteItem[]; }) => {
 
    return ( 
        <>
             {favorites &&  <div className='main_container'>
                            {favorites.map((favorites: FavoriteItem, index: number) => {
                                return (
                                    <FavoritesCard favorites={favorites} key={index} />
                                )
                            })}
                        </div>}
        </>
     );
}
 
