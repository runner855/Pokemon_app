import React, { useState } from 'react';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { BsSliders } from "react-icons/bs";
import { useAppContext } from "../../context/AppContext";
import "./Pokemon.css";

type FilterType = "NONE" | "AZ" | "ZA" | "FAVORITES";
export const Pokemon = () => {

    const { pokemon, favorites, setFavorites, pageNumber, setPageNumber } = useAppContext();



    const [filterOpen, setFilterOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState<FilterType>("NONE");

    const displayedPokemon = React.useMemo(() => {
        if (!pokemon) return [];

        switch (activeFilter) {
            case "AZ":
                return [...pokemon].sort((a, b) => a.name.localeCompare(b.name));

            case "ZA":
                return [...pokemon].sort((a, b) => b.name.localeCompare(a.name));

            case "FAVORITES":
                const favoriteIds = new Set(
                    favorites.filter(f => f.favorite).map(f => f.id)
                );
                return pokemon.filter(p => favoriteIds.has(p.id));

            default:
                return pokemon;
        }
    }, [pokemon, favorites, activeFilter]);


    const handleFilter = () => {
        setFilterOpen(!filterOpen)
    }

    const handleFilterAZ = () => setActiveFilter('AZ');
    const handleFilterZA = () => setActiveFilter('ZA');
    const handleFavoritesFilter = () => setActiveFilter("FAVORITES");

    const handleLoadMore = () => {
        setPageNumber((prev) => prev + 1);
    };

    return (
        <>
            <div className='pokemon_title'>Pokemon</div>
            <div className="order_by_container">
            <div className='all_filters'>
                <BsSliders/>
                All Filters
            </div>
                {displayedPokemon.length} results
                <div className="order_by">Order by:</div>
                <span className="az">A-Z</span>

                <div className="open_filter" onClick={handleFilter}>
                    {filterOpen ? <SlArrowUp /> : <SlArrowDown />}
                </div>

                {filterOpen && (
                    <div className="dropdown">
                        <div className="dropdown_item" onClick={handleFilterAZ}>A–Z</div>
                        <div className="dropdown_item" onClick={handleFilterZA}>Z–A</div>
                        <div className="dropdown_item" onClick={handleFavoritesFilter}>Favorites</div>
                    </div>
                )}
            </div>

            <div className="pokemon_container">
                {displayedPokemon.map((pok) => (
                    <PokemonCard
                        key={pok.id}
                        pok={pok}
                        favorites={favorites}
                        setFavorites={setFavorites}
                    />
                ))}
            </div>

            <div className='load_more_container'>
                <p>You have viewed {displayedPokemon.length} Pokemon of 1350</p>
                <button className='load_more' onClick={handleLoadMore}>Load More Pokemon</button>

            </div>
        </>
    );
}

