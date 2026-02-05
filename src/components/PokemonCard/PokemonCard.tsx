import React from 'react';
import { FavoriteItem, PokemonDetailsObject, PokemonFinalObject } from '../../type/appTypes';
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useNavigate } from "react-router";
import "./PokemonCard.css";
import { PokemonEvolution } from '../PokemonEvolution/PokemonEvolution';

type PokemonCardProps = {
  pok: PokemonFinalObject;
  favorites: FavoriteItem[];
  setFavorites: React.Dispatch<React.SetStateAction<FavoriteItem[]>>;
  pokemonDetails?: PokemonDetailsObject; 
};



export const PokemonCard = ({ pok, favorites, setFavorites, pokemonDetails }: PokemonCardProps) => {
  const [mainImage, setMainImage] = React.useState(pok.mainImage);
    const navigate = useNavigate();

      const isFavorite = favorites.some(f => f.id === pok.id);

    const IMAGE_NOTFOUND_PLACEHOLDER = 'https://nftcalendar.io/storage/uploads/2022/02/21/image-not-found_0221202211372462137974b6c1a.png';

    const handleFavIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev =>
      isFavorite
        ? prev.filter(f => f.id !== pok.id)
            : [...prev, {
                id: pok.id,
                name: pok.name,
                image: pok.mainImage,
                favorite: true,
                price:pok.price
            }]
    );
  };

    return (
        <div className='card' key={pok.id} onClick={() => navigate(`/pokemon/${pok.id}`)}>
            <div className='image_container'>
                 <div className='pokemon_card_fav_icon' onClick={handleFavIconClick}>{isFavorite ?<MdFavorite className='pokemon_card_fav_icon_clicked'/>:<MdFavoriteBorder/>}</div>
                
                <img
                    className="results_pokemon_img"
                    src={pok.mainImage || IMAGE_NOTFOUND_PLACEHOLDER}
                    alt={pok.name || 'Pokemon Image'}
                    loading='lazy'
                    onError={(e) => e.currentTarget.src = IMAGE_NOTFOUND_PLACEHOLDER}
                />
        </div>
        <div className='card_info'>
          <div className='card_title'>{pok.name.toUpperCase() || 'Title unavailable'}</div>
          <div className='pokemon_price'>EUR {pokemonDetails?.price},00</div>
             <div onClick={e => e.stopPropagation()}>
          <PokemonEvolution
            pokemonId={pok.id}
            mainImage={mainImage}
            setMainImage={setMainImage}
          />
        </div>

        </div>
        </div>
    );
}

