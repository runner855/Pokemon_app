import React, { useEffect, useState } from 'react';
import { getPokemon } from '../../hooks/getPokemon';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import { FavoriteItem, PokemonDetailsObject, PokemonFinalObject } from '../../type/appTypes';
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import "./Pokemon.css";


interface PokemonProps {
    pokemon: PokemonFinalObject[] | undefined;
    favorites: FavoriteItem[];
    setFavorites: React.Dispatch<React.SetStateAction<FavoriteItem[]>>;
}
export const Pokemon = ({ pokemon, favorites, setFavorites }: PokemonProps) => {

    const [filterOpen, setFilterOpen] = useState(false);

    const handleFilter = () => {
        setFilterOpen(!filterOpen)
    }


    return (
        <>
            <div className='pokemon_title'>Pokemon</div>
            <div className='order_by_container'>
                <div className='order_by'>Order by:</div>
                <span className='az'>A-Z</span>
                <div className='open_filter' onClick={handleFilter}>
                    {filterOpen ? <SlArrowUp />
                        :
                        <SlArrowDown />}
                </div>
                {filterOpen &&
                    <div className="dialog-backdrop">
                        <div className="dialog">
                            <h2>Dialog title</h2>
                            <p>Dialog content</p>
                        </div>
                    </div>}
            </div>
            {pokemon &&
                <div className='pokemon_container'>
                    {pokemon.map((pok: PokemonFinalObject, index: number) => {
                        return (
                            <PokemonCard
                                key={index}
                                pok={pok}
                                favorites={favorites}
                                setFavorites={setFavorites}

                            />
                        )
                    })}
                </div>
            }
        </>
    );
}

