import React, { useState } from 'react';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import { FavoriteItem, PokemonFinalObject } from '../../type/appTypes';
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import "./Pokemon.css";


interface PokemonProps {
    pokemon: PokemonFinalObject[] | undefined;
    favorites: FavoriteItem[];
    setFavorites: React.Dispatch<React.SetStateAction<FavoriteItem[]>>;
    pageNumber: number;
    setPageNumber: React.Dispatch<React.SetStateAction<number>>

}
export const Pokemon = ({ pokemon, favorites, setFavorites, pageNumber, setPageNumber }: PokemonProps) => {

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

    const handleLoadMore = () => {
        setPageNumber((prev) => prev + 1);
    };

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
                                    key={pok.id}
                                    pok={pok}
                                    favorites={favorites}
                                    setFavorites={setFavorites}

                                />
                            )
                        }) :
                        pokemon.map((pok: PokemonFinalObject, index: number) => {
                            return (
                                <PokemonCard
                                    key={pok.id}
                                    pok={pok}
                                    favorites={favorites}
                                    setFavorites={setFavorites}

                                />
                            )
                        })
                    }
                </div>
            }
            <div className='load_more_container'>
                <p>You have viewed {pokemon?.length} Pokemon of 1350</p>
                <button className='load_more' onClick={handleLoadMore}>Load More Pokemon</button>

            </div>
        </>
    );
}

