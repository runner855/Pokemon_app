import React, { useEffect, useMemo, useState } from "react";
import { PokemonCard } from "../PokemonCard/PokemonCard";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { BsSliders } from "react-icons/bs";
import { MdClear } from "react-icons/md";
import { useAppContext } from "../../context/AppContext";
import "./Pokemon.css";
import { PokemonTypes } from "../../type/appTypes";

type FilterType =
    | "NONE"
    | "AZ"
    | "ZA"
    | "FAVORITES"
    | "Price(High to Low)"
    | "Price(Low to High)";

const ALL_POKEMON_TYPES: PokemonTypes[] = [
    "fire",
    "water",
    "grass",
    "electric",
    "ice",
    "dragon",
    "dark",
    "fairy",
    "normal",
    "fighting",
    "flying",
    "poison",
    "ground",
    "rock",
    "bug",
    "ghost",
    "steel",
    "psychic",
];

export const Pokemon = () => {
    const {
        pokemon,
        favorites,
        setFavorites,
        pageNumber,
        setPageNumber,
        allFiltersClicked,
        setAllFiltersClicked,
        pokemonDetailsMap,
        fetchPokemonDetailsIfNeeded,
    } = useAppContext();


    useEffect(() => {
        if (!pokemon) return;

        pokemon.forEach(p => {
            fetchPokemonDetailsIfNeeded(p.id);
        });
    }, [pokemon, fetchPokemonDetailsIfNeeded]);

    const [filterOpen, setFilterOpen] = useState(false);
    const [filterDropDownOpen, setFilterDropDownOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState<FilterType>("NONE");
    const [selectedType, setSelectedType] = useState<PokemonTypes | null>(null);


    const displayedPokemon = useMemo(() => {
        if (!pokemon) return [];

        let result = [...pokemon];


        if (selectedType) {
            result = result.filter(p => {
                const details = pokemonDetailsMap[p.id];
                return details?.types?.includes(selectedType);
            });
        }

        switch (activeFilter) {
            case "AZ":
                return result.sort((a, b) => a.name.localeCompare(b.name));

            case "ZA":
                return result.sort((a, b) => b.name.localeCompare(a.name));

            case "FAVORITES": {
                const favoriteIds = new Set(
                    favorites.filter(f => f.favorite).map(f => f.id)
                );
                return result.filter(p => favoriteIds.has(p.id));
            }

            case "Price(High to Low)":
                return result.sort((a, b) => b.price - a.price);

            case "Price(Low to High)":
                return result.sort((a, b) => a.price - b.price);

            default:
                return result;
        }
    }, [pokemon, favorites, activeFilter, selectedType, pokemonDetailsMap]);

    return (
        <>
            <div className="pokemon_title">Pokemon</div>

            <div className="filters_container">
                <div
                    className="filters_left"
                    onClick={() => setAllFiltersClicked(prev => !prev)}
                >
                    {allFiltersClicked && (
                        <div className="allfilters_overlay" onClick={() => setAllFiltersClicked(false)}>
                            <div
                                className="allfilters_options"
                                onClick={e => e.stopPropagation()}
                            >
                                <div className="filters_header">
                                    <h2 className="filters_title">Filters</h2>
                                    <button
                                        className="filters_close"
                                        onClick={() => setAllFiltersClicked(false)}
                                    >
                                        <MdClear />
                                    </button>
                                </div>

                                <div className="filter_section">
                                    <div
                                        className="filter_type_container"
                                        onClick={() => setFilterDropDownOpen(prev => !prev)}
                                    >
                                        <h2 className="filter_types">Types</h2>
                                        <div className="allfilters_dropdown">
                                            {filterDropDownOpen ? <SlArrowUp /> : <SlArrowDown />}
                                        </div>
                                    </div>

                                    {filterDropDownOpen && (
                                        <div className="type_filter_content">
                                            {ALL_POKEMON_TYPES.map(type => (
                                                <div
                                                    key={type}
                                                    className={`type_filter_item ${selectedType === type ? "active" : ""
                                                        }`}
                                                    onClick={() =>
                                                        setSelectedType(prev => (prev === type ? null : type))
                                                    }
                                                >
                                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                                </div>
                                            ))}
                                            {/* 
                                        {selectedType && (
                                            <button
                                                className="clear_type_filter"
                                                onClick={() => setSelectedType(null)}
                                            >
                                                Clear type filter
                                            </button>
                                        )} 
                                        /* this needs to be at the very bottom of al the collapse filters */
                                            }
                                        </div>
                                    )}
                                </div>
                                <div className="filters_bottom_buttons">
                                    <div className="clearAll">Clear All</div><div className="seeResults">See Results</div>
                                </div>
                            </div>
                        </div>
                    )}

                    <span className="allfilters_container">
                        <div className="allfilters_icon">
                            <BsSliders />
                        </div>
                        All Filters</span>
                </div>

                <div className="filters_right">
                    <span className="results">{displayedPokemon.length} Results</span>

                    <div className="order_by_container">
                        <span className="order_by">Order by:</span>
                        <span className="active_filter">
                            {activeFilter === "NONE" ? "A–Z" : activeFilter}
                        </span>

                        <div
                            className="open_filter"
                            onClick={() => setFilterOpen(prev => !prev)}
                        >
                            {filterOpen ? <SlArrowUp /> : <SlArrowDown />}
                        </div>

                        {filterOpen && (
                            <div className="dropdown">
                                <div className="dropdown_item" onClick={() => setActiveFilter("AZ")}>A–Z</div>
                                <div className="dropdown_item" onClick={() => setActiveFilter("ZA")}>Z–A</div>
                                <div className="dropdown_item" onClick={() => setActiveFilter("FAVORITES")}>Favorites</div>
                                <div className="dropdown_item" onClick={() => setActiveFilter("Price(High to Low)")}>Price (High → Low)</div>
                                <div className="dropdown_item" onClick={() => setActiveFilter("Price(Low to High)")}>Price (Low → High)</div>
                            </div>
                        )}
                    </div>


                </div>
            </div>

            <div className="pokemon_container">
                {displayedPokemon.map(pok => (
                    <PokemonCard
                        key={pok.id}
                        pok={pok}
                        favorites={favorites}
                        setFavorites={setFavorites}
                        pokemonDetails={pokemonDetailsMap[pok.id]}
                    />
                ))}
            </div>

            <div className="load_more_container">
                <p>You have viewed {displayedPokemon.length} Pokémon of 1350</p>
                <button className="load_more" onClick={() => setPageNumber(p => p + 1)}>
                    Load More Pokémon
                </button>
            </div>
        </>
    );
};
