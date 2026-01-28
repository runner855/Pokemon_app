import React, { useState } from 'react';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { BsSliders } from "react-icons/bs";
import { useAppContext } from "../../context/AppContext";
import { MdClear } from "react-icons/md";
import "./Pokemon.css";

type FilterType = "NONE" | "AZ" | "ZA" | "FAVORITES" | "Price(High to Low)" | "Price(Low to High)" ;
export const Pokemon = () => {


    

    const {
        pokemon,
        favorites,
        setFavorites,
        pageNumber,
        setPageNumber,
        allFiltersClicked,
        setAllFiltersClicked,
    } = useAppContext();

    console.log(pokemon)

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
            case "Price(High to Low)":
                return [...pokemon].sort((a, b) => b.price - a.price);
            case "Price(Low to High)":
                return [...pokemon].sort((a, b) => a.price - b.price)
            
         

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
    const handleFilterHightoLow = () => setActiveFilter('Price(High to Low)');
    const handleFilterLowtoHigh = () => setActiveFilter('Price(Low to High)');

    const handleLoadMore = () => {
        setPageNumber((prev) => prev + 1);
    };

    const handleAllFilters = () => {
        setAllFiltersClicked(!allFiltersClicked);
        console.log('all_filters')
    }

    return (
        <>
            <div className="pokemon_title">Pokemon</div>


            <div className="filters_container">
                <div className="filters_left" onClick={handleAllFilters}>
                    {allFiltersClicked ? <MdClear /> : <BsSliders />}
                    <span>All Filters</span>
                </div>

                <div className="filters_right">
                    <span className="results">{displayedPokemon.length} Results</span>

                    <div className="order_by_container">
                        <span className="order_by">Order by:</span>
                        <span className="active_filter">A-Z</span>

                        <div className="open_filter" onClick={handleFilter}>
                            {filterOpen ? <SlArrowUp /> : <SlArrowDown />}
                        </div>

                        {filterOpen && (
                            <div className="dropdown">
                                <div className="dropdown_item" onClick={handleFilterAZ}>A–Z</div>
                                <div className="dropdown_item" onClick={handleFilterZA}>Z–A</div>
                                <div className="dropdown_item" onClick={handleFavoritesFilter}>Favorites</div>
                                <div className="dropdown_item" onClick={handleFilterHightoLow} >Price(High to Low)</div>
                                <div className="dropdown_item" onClick={handleFilterLowtoHigh}>Price(Low to High)</div>

                            </div>
                        )}
                    </div>
                </div>
            </div>

            {allFiltersClicked && (
                <div className="allfilters_overlay" onClick={handleAllFilters}>
                    <div
                        className="allfilters_options"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="filters_header">
                            <h2 className="filters_title">Filters</h2>
                            <button className="filters_close" onClick={handleAllFilters}>
                                <MdClear />
                            </button>
                        </div>

                        <div className="filters_body">
                            <ul className="filters_list">
                                <li>filter one</li>
                                <li>filter two</li>
                                <li>filter three</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}


            <div className="pokemon_container">
                {displayedPokemon.map(pok => (
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

