import React from 'react';
import { FavoriteItem } from '../../type/appTypes';
import { FavoritesCard } from '../FavoritesCard/FavoritesCard';
import "./PokemonFavorites.css";
import { useAppContext } from '../../context/AppContext';

export const PokemonFavorites = () => {

    const { favorites, setFavorites } = useAppContext();

    return (
        <>

            <div className='pokemon_favorite_title'>Pokemon Favorites</div>
            {favorites?.length > 0 &&
                <div className='favorites_container'>
                    {favorites.map((favorite: FavoriteItem, index: number) => {
                        return (
                            <FavoritesCard
                                favorite={favorite}
                                key={favorite.id}
                                setFavorites={setFavorites}
                            />
                        )
                    })}
                </div>}
        </>
    );
}

