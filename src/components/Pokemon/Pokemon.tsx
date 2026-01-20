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
    const [filteredPokemon, setFilteredPokemon] = useState<PokemonFinalObject[] | undefined>();

    const handleFilter = () => {
        setFilterOpen(!filterOpen)
    }

    const handleFilterAZ = () => {
        if (Array.isArray(pokemon)) {
            // setFilteredPokemon(undefined)
            const sortedPokemonAZ = [...pokemon].sort((a, b) => a.name.localeCompare(b.name));
            setFilteredPokemon(sortedPokemonAZ);
            console.log("here1", filteredPokemon)

            
        }
    }

    const handleFilterZA = () => {
        if (Array.isArray(pokemon)) {
            // setFilteredPokemon(undefined)
            const sortedPokemonZA = [...pokemon].sort((a, b) => b.name.localeCompare(a.name));
            setFilteredPokemon(sortedPokemonZA);
            console.log("here", filteredPokemon)
        }
    }

    // const alphabeticDown: boolean = true;





    return (
        <>
            <div className='pokemon_title'>Pokemon</div>
            <div className="order_by_container">
                <div className="order_by">Order by:</div>
                <span className="az">A-Z</span>

                <div className="open_filter" onClick={handleFilter}>
                    {filterOpen ? <SlArrowUp /> : <SlArrowDown />}
                </div>

                {filterOpen && (
                    <div className="dropdown">
                        <div className="dropdown_item" onClick={handleFilterAZ}>A–Z</div>
                        <div className="dropdown_item" onClick={handleFilterZA}>Z–A</div>
                        <div className="dropdown_item">Favorites</div>
                    </div>
                )}
            </div>

            {pokemon &&
                <div className='pokemon_container'>
                    {filteredPokemon ?
                        filteredPokemon.map((pok: PokemonFinalObject, index: number) => {
                            return (
                                <PokemonCard
                                    key={index}
                                    pok={pok}
                                    favorites={favorites}
                                    setFavorites={setFavorites}

                                />
                            )
                        }) :
                        pokemon.map((pok: PokemonFinalObject, index: number) => {
                            return (
                                <PokemonCard
                                    key={index}
                                    pok={pok}
                                    favorites={favorites}
                                    setFavorites={setFavorites}

                                />
                            )
                        })
                    }
                </div>
            }
            <div>
                                    <button className='load_more'>Load More Pokemon</button>

            </div>
        </>
    );
}

