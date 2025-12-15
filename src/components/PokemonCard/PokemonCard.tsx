import React from 'react';
import { PokemonFinalObject } from '../../type/appTypes';
import { useNavigate } from "react-router";
import "./PokemonCard.css";


export const PokemonCard = ({ pok }: { pok: PokemonFinalObject }) => {
    const navigate = useNavigate();

    const IMAGE_NOTFOUND_PLACEHOLDER = 'https://nftcalendar.io/storage/uploads/2022/02/21/image-not-found_0221202211372462137974b6c1a.png';

    return (
        <div className='card' key={pok.id} onClick={() => navigate(`/pokemon/${pok.id}`)}>
            <div className='image_container'>

                <img
                    className="pokemon_img"
                    src={pok.mainImage || IMAGE_NOTFOUND_PLACEHOLDER}
                    alt={pok.name || 'Pokemon Image'}
                    loading='lazy'
                    onError={(e) => e.currentTarget.src = IMAGE_NOTFOUND_PLACEHOLDER}
                />
            </div>
            <div className='title'>{pok.name.toUpperCase() || 'Title unavailable'}</div>
        </div>
    );
}

