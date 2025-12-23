import React from 'react';
import { FavoriteItem, PokemonFavoritesProps } from '../../type/appTypes';
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useNavigate } from "react-router";
import "./FavoritesCard.css";
import { PokemonDetails } from '../PokemonDetails/PokemonDetails';

interface FavoritesCardProps {
  favorite: FavoriteItem;
  setFavorites: React.Dispatch<React.SetStateAction<FavoriteItem[]>>;
}

export const FavoritesCard = ({ favorite, setFavorites}: FavoritesCardProps) => {

    const IMAGE_NOTFOUND_PLACEHOLDER = 'https://nftcalendar.io/storage/uploads/2022/02/21/image-not-found_0221202211372462137974b6c1a.png';

    const navigate = useNavigate();

    const handleFavIconClick = () => {
         setFavorites(prev =>
    prev.filter(f => f.id !== favorite.id)
  );
    }

    return (
        <div className='favorites_card' key={favorite.id}>
            <div className='favorite_image_container' onClick={() => navigate(`/pokemon/${favorite.id}`)}>

                <div className='favorite_icon' onClick={handleFavIconClick}>{favorite.favorite ?<MdFavorite />:<MdFavoriteBorder/>}</div>
                <img
                    className="favorite_pokemon_img"
                    src={favorite.image || IMAGE_NOTFOUND_PLACEHOLDER}
                    alt={favorite.name || 'Pokemon Image'}
                    loading='lazy'
                    onError={(e) => e.currentTarget.src = IMAGE_NOTFOUND_PLACEHOLDER}
                />
            </div>
            <div className='favorite_title_container'>
                {favorite.name && <div className='favorite_title'>{favorite.name.toUpperCase() || 'Title unavailable'}</div>}
            </div>
            </div>
    );
}

