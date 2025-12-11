import React from 'react';
import { FavoriteItem } from '../../type/appTypes';
import "./FavoritesCard.css";

export const FavoritesCard = ({ favorites }: { favorites: FavoriteItem }) => {

    const IMAGE_NOTFOUND_PLACEHOLDER = 'https://nftcalendar.io/storage/uploads/2022/02/21/image-not-found_0221202211372462137974b6c1a.png';

    return (
        <div className='card' key={favorites.id}>
            <div className='image_container'>

                <img
                    className="pokemon_img"
                    src={favorites.image || IMAGE_NOTFOUND_PLACEHOLDER}
                    alt={favorites.name || 'Pokemon Image'}
                    loading='lazy'
                    onError={(e) => e.currentTarget.src = IMAGE_NOTFOUND_PLACEHOLDER}
                />
            </div>
            <div className='title'>{favorites.name.toUpperCase() || 'Title unavailable'}</div>
        </div>
    );
}

