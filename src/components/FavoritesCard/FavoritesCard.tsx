import React from 'react';
import { FavoriteItem } from '../../type/appTypes';
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useNavigate } from "react-router";
import "./FavoritesCard.css";

export const FavoritesCard = ({ favorites }: { favorites: FavoriteItem }) => {

    const IMAGE_NOTFOUND_PLACEHOLDER = 'https://nftcalendar.io/storage/uploads/2022/02/21/image-not-found_0221202211372462137974b6c1a.png';

    const navigate = useNavigate();
   

    return (
        <div className='favorites_card' key={favorites.id}>
            <div className='favorite_image_container' onClick={() => navigate(`/pokemon/${favorites.id}`)}>

                <img
                    className="favorite_pokemon_img"
                    src={favorites.image || IMAGE_NOTFOUND_PLACEHOLDER}
                    alt={favorites.name || 'Pokemon Image'}
                    loading='lazy'
                    onError={(e) => e.currentTarget.src = IMAGE_NOTFOUND_PLACEHOLDER}
                />
            </div>
            <div className='favorite_title'>{favorites.name.toUpperCase() || 'Title unavailable'}<MdFavorite/></div>
        </div>
    );
}

