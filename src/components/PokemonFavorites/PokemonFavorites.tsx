import React from 'react';
import { FavoriteItem, PokemonFavoritesProps } from '../../type/appTypes';
import { FavoritesCard } from '../FavoritesCard/FavoritesCard';
import "./PokemonFavorites.css";

export const PokemonFavorites: React.FC<PokemonFavoritesProps> = ({
    favorites,
    setFavorites
    
}) => {
 
    return ( 
        <>
             {favorites?.length > 0 &&  <div className='main_container'>
                            {favorites.map((favorite: FavoriteItem, index: number) => {
                                return (
                                    <FavoritesCard favorite={favorite} key={favorite.id} setFavorites={setFavorites} />
                                )
                            })}
                        </div>}
        </>
     );
}
 
