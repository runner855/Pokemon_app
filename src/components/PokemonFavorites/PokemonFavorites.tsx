import React from 'react';
import { FavoriteItem } from '../../type/appTypes';
import { FavoritesCard } from '../FavoritesCard/FavoritesCard';
import "./PokemonFavorites.css";

interface PokemonFavoritesProps {
    favorites: FavoriteItem[];
    setFavorites: React.Dispatch<React.SetStateAction<FavoriteItem[]>>;
}

export const PokemonFavorites = ({
    favorites,
    setFavorites
}: PokemonFavoritesProps) => {

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

